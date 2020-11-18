/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import isEqual from 'lodash/isEqual';
import { withTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import PopperContent from '../PopperContent/PopperContent';
import DropdownContext, { DropdownContextProps } from './Dropdown.context';
import createStyles from './Dropdown.styles';

type DropdownMenuProps = {
  children: React.ReactNode;
  className?: string;
  // from `withTheme` hoc, just ignore it
  theme: Theme;
};

class DropdownMenu extends React.Component<DropdownMenuProps> {
  static contextType = DropdownContext;

  context!: DropdownContextProps;
  prevContext: DropdownContextProps;
  initialOpen: DropdownContextProps['open'];
  delay: number;
  mounted: boolean;
  showTimeout?: NodeJS.Timeout;
  hideTimeout?: NodeJS.Timeout;

  constructor(props: DropdownMenuProps, context: DropdownContextProps) {
    super(props);

    this.delay = 0;
    this.mounted = false;
    this.initialOpen = context.open;
    this.prevContext = context;
  }

  componentDidMount() {
    this.mounted = true;
    this.addTargetEvents();
  }

  componentDidUpdate() {
    // props.trigger === 'manual'
    if (
      this.context.props.trigger === 'manual' &&
      this.prevContext.props.open !== this.context.props.open &&
      !this.context.props.disabled
    ) {
      this.context.setOpen(this.context.props.open);
    }

    // If props.trigger change
    // If props.disabled change
    if (
      this.prevContext.props.trigger !== this.context.props.trigger ||
      this.prevContext.props.disabled !== this.context.props.disabled
    ) {
      this.removeTargetEvents();
      this.addTargetEvents();

      if (this.context.props.disabled) {
        this.prevContext.open && this.context.setOpen(false);
      } else if (this.context.props.trigger === 'manual') {
        this.context.setOpen(this.context.props.open);
      } else if (this.context.props.trigger === 'focus') {
        if (
          this.context.toggleElem &&
          this.context.toggleElem === document.activeElement &&
          !this.context.open
        ) {
          this.context.setOpen(true);
        } else {
          if (this.context.open) {
            this.context.setOpen(true);
          }
        }
      } else {
        if (this.context.open) {
          this.context.setOpen(false);
        }
      }
    }

    // If placement change
    // Fix Popper wrong position
    if (
      this.prevContext.props.menu.placement !== this.context.props.menu.placement &&
      this.context.open
    ) {
      this.context.setOpen(false);
      window.requestAnimationFrame(() => {
        this.context.setOpen(true);
      });
    }

    // Context changed
    if (!isEqual(this.prevContext, this.context)) {
      this.prevContext = this.context;
      this.removeTargetEvents();
      this.addTargetEvents();
    }
  }

  componentWillUnmount() {
    this.removeTargetEvents();
    this.mounted = false;
  }

  handleDocumentClick = (e: MouseEvent | TouchEvent) => {
    const {
      toggleElem,
      props: { trigger },
    } = this.context;

    const target = e.target as HTMLElement | null;

    if (toggleElem) {
      if (toggleElem.contains(target)) {
        trigger === 'click' && this.toggle();
      } else {
        if (trigger === 'click' || trigger === 'hover') {
          this.hide();
        }
      }
    }
  };

  addTargetEvents = () => {
    const {
      toggleElem,
      props: { trigger },
    } = this.context;

    if (!toggleElem) return;

    if (trigger === 'hover') {
      toggleElem.addEventListener('mouseover', this.show, true);
      toggleElem.addEventListener('mouseout', this.hide, true);
    } else if (trigger === 'focus') {
      toggleElem.addEventListener('focus', this.show, true);
      toggleElem.addEventListener('blur', this.hide, true);
    }

    ['click', 'touchstart'].forEach(e =>
      document.addEventListener(e as 'click' | 'touchstart', this.handleDocumentClick, true),
    );
  };

  removeTargetEvents = () => {
    const { toggleElem } = this.context;

    if (!toggleElem) return;

    ['mouseover', 'focus'].forEach(e => toggleElem.removeEventListener(e, this.show, true));
    ['mouseout', 'blur'].forEach(e => toggleElem.removeEventListener(e, this.hide, true));

    ['click', 'touchstart'].forEach(e =>
      document.removeEventListener(e as 'click' | 'touchstart', this.handleDocumentClick, true),
    );
  };

  show = () => {
    this.hideTimeout && clearTimeout(this.hideTimeout);
    this.showTimeout = setTimeout(this.onShow, this.delay);
  };

  onShow = () => {
    this.showTimeout && clearTimeout(this.showTimeout);
    this.context.setOpen(true);
  };

  hide = () => {
    this.showTimeout && clearTimeout(this.showTimeout);
    this.hideTimeout = setTimeout(this.onHide, this.delay);
  };

  onHide = () => {
    this.hideTimeout && clearTimeout(this.hideTimeout);
    this.mounted && this.context.setOpen(false);
  };

  toggle = () => {
    this.context.setOpen(!this.prevContext.open);
  };

  handleMouseOverContent = () => {
    // Prevent hide when user hover on tooltip, only when this.context.props.trigger === 'hover'
    if (this.context.props.trigger !== 'hover') return;
    this.hideTimeout && clearTimeout(this.hideTimeout);
  };

  handleMouseLeaveContent = () => {
    if (this.context.props.trigger !== 'hover') return;
    this.showTimeout && clearTimeout(this.showTimeout);
    this.hideTimeout = setTimeout(this.hide, this.delay);
  };

  render() {
    const { children, theme, ...rest } = this.props;
    const styles = createStyles(theme);
    const { elevation } = this.context.props.menu;

    if (this.context.toggleElem) {
      return (
        <PopperContent
          {...rest}
          css={styles.menu}
          target={this.context.toggleElem}
          open={this.context.open}
          arrowClassName="dropdown-arrow"
          placement={this.context.props.menu.placement}
          transition={this.context.props.menu.transition}
          role="menu"
          tabIndex={-1}
          aria-hidden={!this.context.open}
          fallbackPlacements={[
            'top',
            'top-start',
            'top-end',
            'bottom',
            'bottom-start',
            'bottom-end',
          ]}
          onMouseOver={this.handleMouseOverContent}
          onMouseOut={this.handleMouseLeaveContent}
        >
          <div
            css={[
              styles.menuInner,
              elevation === 'container' && styles.elevationContainer,
              elevation === 'raised' && styles.elevationRaised,
              elevation === 'float' && styles.elevationFloat,
              elevation === 'hover' && styles.elevationHover,
            ]}
          >
            {children}
          </div>
        </PopperContent>
      );
    }

    return null;
  }
}

export default withTheme(DropdownMenu);
