/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import isBoolean from 'lodash/isBoolean';
import omit from 'lodash/omit';
import withTheme from '../../utils/withTheme';
import { Theme } from '../../theme';
import PopperContent, { PopperContentProps } from '../PopperContent/PopperContent';
import getTarget, { TargetPropType } from '../../utils/getTarget';
import createStyles from './Tooltip.styles';

type TooltipProps = Pick<PopperContentProps, 'className' | 'open' | 'placement' | 'transition'> & {
  children: React.ReactNode;
  target: TargetPropType;
  // from `withTheme` hoc, just ignore it
  theme: Theme;
  /** @default "hover" */
  trigger: 'click' | 'hover' | 'focus' | 'manual';
};

type State = {
  open: boolean;
};

class Tooltip extends React.Component<TooltipProps, State> {
  static defaultProps: Pick<TooltipProps, 'trigger'> = {
    trigger: 'hover',
  };

  delay: number;
  mounted: boolean;
  initialOpen?: boolean;
  showTimeout?: NodeJS.Timeout;
  hideTimeout?: NodeJS.Timeout;
  targetElement?: HTMLElement;

  constructor(props: TooltipProps) {
    super(props);

    this.delay = 0;
    this.mounted = false;
    this.initialOpen = props.open;
    this.state = {
      open: props.trigger === 'manual' && isBoolean(props.open) ? props.open : false,
    };
  }

  componentDidMount() {
    this.mounted = true;
    const target = getTarget(this.props.target);
    if (target) {
      this.targetElement = target;
      this.addTargetEvents();
    }
  }

  componentDidUpdate(prevProps: TooltipProps) {
    // props.trigger === 'manual'
    if (
      this.props.trigger === 'manual' &&
      isBoolean(this.props.open) &&
      prevProps.open !== this.props.open
    ) {
      this.setState({
        open: this.props.open,
      });
    }

    // If props.trigger change
    if (prevProps.trigger !== this.props.trigger) {
      this.removeTargetEvents();
      this.addTargetEvents();

      if (this.props.trigger === 'manual') {
        this.setState({
          open: isBoolean(this.props.open) ? this.props.open : this.state.open,
        });
      } else if (this.props.trigger === 'focus') {
        if (
          this.targetElement &&
          this.targetElement === document.activeElement &&
          !this.state.open
        ) {
          this.setState({
            open: true,
          });
        } else {
          if (this.state.open) {
            this.setState({
              open: false,
            });
          }
        }
      } else {
        if (this.state.open) {
          this.setState({
            open: false,
          });
        }
      }
    }

    // If placement change
    // Fix Popper wrong position
    if (prevProps.placement !== this.props.placement && this.state.open) {
      this.setState(
        {
          open: false,
        },
        () => {
          window.requestAnimationFrame(() => {
            this.setState({
              open: true,
            });
          });
        },
      );
    }
  }

  componentWillUnmount() {
    this.removeTargetEvents();
    this.mounted = false;
  }

  handleDocumentClick = (event: MouseEvent | TouchEvent) => {
    const { trigger } = this.props;

    const target = event.target as HTMLElement | null;

    if (this.targetElement) {
      if (this.targetElement.contains(target)) {
        trigger === 'click' && this.toggle();
      } else {
        if (trigger === 'click' || trigger === 'hover') {
          this.hide();
        }
      }
    }
  };

  addTargetEvents = () => {
    if (!this.targetElement) return;

    if (this.props.trigger === 'hover') {
      this.targetElement.addEventListener('mouseover', this.show, true);
      this.targetElement.addEventListener('mouseout', this.hide, true);
    } else if (this.props.trigger === 'focus') {
      this.targetElement.addEventListener('focus', this.show, true);
      this.targetElement.addEventListener('blur', this.hide, true);
    }

    ['click', 'touchstart'].forEach(e =>
      document.addEventListener(e as 'click' | 'touchstart', this.handleDocumentClick, true),
    );
  };

  removeTargetEvents = () => {
    ['mouseover', 'focus'].forEach(
      e => this.targetElement && this.targetElement.removeEventListener(e, this.show, true),
    );
    ['mouseout', 'blur'].forEach(
      e => this.targetElement && this.targetElement.removeEventListener(e, this.hide, true),
    );
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
    this.setState({
      open: true,
    });
  };

  hide = () => {
    this.showTimeout && clearTimeout(this.showTimeout);
    this.hideTimeout = setTimeout(this.onHide, this.delay);
  };

  onHide = () => {
    this.hideTimeout && clearTimeout(this.hideTimeout);
    // Prevent warning: Can't perform a React state update on an unmounted component.
    if (this.mounted) {
      this.setState({
        open: false,
      });
    }
  };

  toggle = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  };

  handleMouseOverContent = () => {
    // Prevent hide when user hover on tooltip, only when this.props.trigger === 'hover'
    if (this.props.trigger !== 'hover') return;
    this.hideTimeout && clearTimeout(this.hideTimeout);
  };

  handleMouseLeaveContent = () => {
    if (this.props.trigger !== 'hover') return;
    this.showTimeout && clearTimeout(this.showTimeout);
    this.hideTimeout = setTimeout(this.hide, this.delay);
  };

  render() {
    const { children, theme, ...rest } = omit(this.props, ['open', 'target', 'trigger']);
    const styles = createStyles(theme);

    if (this.targetElement) {
      return (
        <PopperContent
          {...rest}
          css={styles.base}
          target={this.targetElement}
          open={this.state.open}
          arrowClassName="tooltip-arrow"
          onMouseOver={this.handleMouseOverContent}
          onMouseOut={this.handleMouseLeaveContent}
        >
          <div css={styles.inner}>{children}</div>
        </PopperContent>
      );
    }

    return null;
  }
}

export default withTheme(Tooltip);
