/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import withTheme from '../../utils/withTheme';
import { Theme } from '../../theme';
import omit from 'lodash/omit';
import { TransitionStatus } from 'react-transition-group/Transition';
import { StandardLonghandPropertiesHyphen } from 'csstype';
import Icon, { IconProps } from '../Icon/Icon';
import NotificationManager from './NotificationManager';
import createStyles from './Notification.styles';

export type NotificationProps = {
  className?: string;
  elevation?: 'none' | keyof Theme['elevation'];
  iconType: 'success' | 'info' | 'error';
  message: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  showIcon: boolean;
  size: 'sm' | 'md' | 'lg';
  theme: Theme;
  timeout: number;
  transitionStatus: TransitionStatus;
  uid: string | number;
};

const defaultProps: Pick<
  NotificationProps,
  'elevation' | 'iconType' | 'showIcon' | 'size' | 'timeout'
> = {
  elevation: 'float',
  iconType: 'success',
  showIcon: true,
  size: 'sm',
  timeout: 5000,
};

class Notification extends React.Component<NotificationProps> {
  static defaultProps = defaultProps;

  ref = React.createRef<HTMLDivElement>();
  timer: number | null = null;
  siblingsTimeout: { [key: string]: any } = {};

  componentDidMount() {
    const { timeout, uid } = this.props;
    if (timeout >= 0) {
      this.timer = window.setTimeout(() => {
        NotificationManager.dismiss(uid);
      }, timeout);
    }
  }

  componentDidUpdate(prevProps: NotificationProps) {
    if (prevProps.transitionStatus !== this.props.transitionStatus) {
      if (this.props.transitionStatus === 'entering') {
        this.animateSiblingsOnEnter();
      } else if (this.props.transitionStatus === 'exiting') {
        this.animateSiblingsOnExit();
      }
    }
  }

  getStyle(el: HTMLElement, styleProp: keyof StandardLonghandPropertiesHyphen) {
    return window.getComputedStyle(el, null).getPropertyValue(styleProp);
  }

  getSiblings(
    elem: HTMLElement,
    direction: 'previous' | 'next',
    filter?: (targetElem: ChildNode | null) => void,
  ) {
    const siblingsDirection = direction === 'next' ? 'nextSibling' : 'previousSibling';
    const siblings: HTMLElement[] = [];
    if (!elem[siblingsDirection]) {
      return siblings;
    }

    let targetElem: HTMLElement | null = elem;

    while ((targetElem = targetElem[siblingsDirection] as HTMLElement | null)) {
      if (targetElem.nodeType === 3) {
        continue; // text node
      }
      if (!filter || filter(targetElem)) {
        siblings.push(targetElem);
      }
    }
    return siblings;
  }

  animateSiblingsOnEnter() {
    const element = this.ref.current;
    if (!element) {
      return;
    }

    const siblings = this.getSiblings(element, 'next');
    if (siblings.length > 0) {
      siblings.forEach((sibling, index) => {
        const h = element.clientHeight;
        const mt = parseInt(this.getStyle(sibling, 'margin-top'), 10);

        const x = '-50%';
        const y = (h + mt) * (index + 1);
        sibling.style.transform = `translate(${x}, ${y}px)`;
      });
    }
  }

  animateSiblingsOnExit() {
    const element = this.ref.current;
    if (!element) {
      return;
    }

    const nextSiblings = this.getSiblings(element, 'next');
    const h = element.clientHeight;
    if (nextSiblings.length > 0) {
      nextSiblings.forEach(sibling => {
        const mt = parseInt(this.getStyle(sibling, 'margin-top'), 10);
        const transform = this.getStyle(sibling, 'transform');
        // https://stackoverflow.com/questions/8601209/fetch-the-css-value-of-transform-directly-using-jquery/38410214#38410214
        // transformValue[scaleX, skewY, skewX, scaleY, translateX, translateY]
        const transformValue = transform.match(/-?[\d.]+/g);
        const x = '-50%';
        let y = mt - h;
        if (transformValue) {
          y = Number(transformValue[5]) - mt - h;
        }
        sibling.style.transform = `translate(${x}, ${y}px)`;
      });
    }
  }

  handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let isTransitioning = false;
    const transitioningClassNames = ['enter-active', 'exit-active'];
    transitioningClassNames.forEach(className => {
      const target = this.ref.current;
      if (target && target.classList.contains(className)) {
        isTransitioning = true;
      }
    });
    if (isTransitioning) {
      return;
    }
    if (e.currentTarget.nodeName === 'A') {
      return;
    }
    this.props.onClick && this.props.onClick(e);
    NotificationManager.dismiss(this.props.uid);
  };

  getIconName(iconType: NotificationProps['iconType']): IconProps['name'] {
    switch (iconType) {
      case 'info':
        return 'info-circle';
      case 'error':
        return 'exclamation-circle';
      default:
        // success
        return 'check-circle';
    }
  }

  render() {
    const {
      className,
      elevation,
      iconType,
      message,
      showIcon,
      size,
      theme,
      uid,
      ...props
    } = omit(this.props, ['timeout', 'transitionStatus']);

    const styles = createStyles(theme);

    return (
      <div
        {...props}
        ref={this.ref}
        data-uid={uid}
        className={className}
        css={[
          styles.main,
          elevation === 'container' && styles.elevationContainer,
          elevation === 'raised' && styles.elevationRaised,
          elevation === 'float' && styles.elevationFloat,
          elevation === 'hover' && styles.elevationHover,
          size === 'sm' && styles.sizeSmall,
          size === 'md' && styles.sizeMedium,
          size === 'lg' && styles.sizeLarge,
        ]}
        onClick={this.handleClick}
        role="presentation"
        tabIndex={0}
      >
        <div css={styles.message}>
          {showIcon && (
            <Icon
              name={this.getIconName(iconType)}
              css={[
                styles.icon,
                iconType === 'success' && styles.iconSuccess,
                iconType === 'info' && styles.iconInfo,
                iconType === 'error' && styles.iconError,
              ]}
            />
          )}
          {message}
        </div>
      </div>
    );
  }
}

export default withTheme(Notification);
