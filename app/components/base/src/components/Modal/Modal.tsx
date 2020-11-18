/** @jsx jsx */
import React from 'react';
import ReactDOM from 'react-dom';
import { jsx, Global } from '@emotion/core';
import withTheme from '../../utils/withTheme';
import { Theme } from '../../theme';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import createStyles from './Modal.styles';

// Utils
import {
  getOriginalBodyPadding,
  conditionallyUpdateScrollbar,
  setScrollbarWidth,
  focusableElements,
} from './Modal.utils';
import isBrowser from '../../utils/isBrowser';

type TransitionProps = Omit<
  CSSTransitionProps,
  'onEnter' | 'onEntering' | 'onEntered' | 'onExit' | 'onExiting' | 'onExited'
>;

type ModalProps = {
  autoFocus?: boolean;
  backdrop?: boolean | 'static';
  centered?: boolean;
  children?: React.ReactNode;
  className?: string;
  keyboard?: boolean;
  onEnter?: EnterHandler;
  onEntered?: EnterHandler;
  onExit?: ExitHandler;
  onExited?: ExitHandler;
  open?: boolean;
  returnFocusAfterClose?: boolean;
  scrollable: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  // from `withTheme` hoc, just ignore it
  theme: Theme;
  transition?: TransitionProps;
  toggle?: (
    e: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>,
  ) => void;
};

type State = {
  open: boolean;
};

export const eventName = '__MODAL_SHOW__';

class Modal extends React.Component<ModalProps, State> {
  static defaultProps: Pick<
    ModalProps,
    | 'autoFocus'
    | 'backdrop'
    | 'centered'
    | 'keyboard'
    | 'open'
    | 'returnFocusAfterClose'
    | 'scrollable'
    | 'size'
  > = {
    autoFocus: true,
    backdrop: true,
    centered: true,
    keyboard: true,
    open: false,
    returnFocusAfterClose: true,
    scrollable: false,
    size: 'md',
  };

  static openCount = 0;

  mouseDownElement?: EventTarget;
  triggeringElement: HTMLElement | null;
  wrapperRef: React.RefObject<HTMLDivElement>;
  modalRef: React.RefObject<HTMLDivElement>;
  modalDialogRef: React.RefObject<HTMLDivElement>;
  originalBodyPadding: number;
  transitionDefault: CSSTransitionProps;
  backdropAnimationTimeout: {
    transition?: NodeJS.Timeout;
    transform?: NodeJS.Timeout;
  };

  constructor(props: ModalProps) {
    super(props);

    this.triggeringElement = null;
    this.wrapperRef = React.createRef();
    this.modalRef = React.createRef();
    this.modalDialogRef = React.createRef();
    this.originalBodyPadding = 0;
    this.transitionDefault = {
      appear: true,
      enter: true,
      exit: true,
      timeout: props.theme.animation.timing.normal,
      classNames: {
        appear: 'appear',
        appearActive: 'appear-active',
        appearDone: 'appear-done',
        enter: 'enter',
        enterActive: 'enter-active',
        enterDone: 'enter-done',
        exit: 'exit',
        exitActive: 'exit-active',
        exitDone: 'exit-done',
      },
    };
    this.backdropAnimationTimeout = {};
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    if (this.props.open) {
      this.init();
      this.setState({ open: true });
      if (this.props.autoFocus) {
        this.setFocus();
      }
    }
  }

  componentDidUpdate(prevProps: ModalProps, prevState: State) {
    if (!prevProps.open && this.props.open) {
      this.init();
      this.setState({ open: true });
    }

    if (this.props.autoFocus && !prevState.open && this.state.open) {
      this.setFocus();
    }
  }

  componentWillUnmount() {
    this.close();
  }

  init() {
    try {
      this.triggeringElement = document.activeElement as HTMLElement | null;
    } catch (err) {
      this.triggeringElement = null;
    }

    this.originalBodyPadding = getOriginalBodyPadding();
    const bodyPadding = conditionallyUpdateScrollbar(this.originalBodyPadding);

    if (Modal.openCount === 0) {
      document.body.classList.add('modal-open');
      const event = new CustomEvent(eventName, { detail: bodyPadding });
      window.dispatchEvent(event);
    }

    Modal.openCount += 1;
  }

  close() {
    if (Modal.openCount === 1) {
      const modalOpenClassName = 'modal-open';
      // Use regex to prevent matching `modal-open` as part of a different class, e.g. `my-modal-opened`
      const modalOpenClassNameRegex = new RegExp(`(^| )${modalOpenClassName}( |$)`);
      document.body.className = document.body.className
        .replace(modalOpenClassNameRegex, ' ')
        .trim();

      setScrollbarWidth(this.originalBodyPadding);
      const event = new CustomEvent(eventName, { detail: this.originalBodyPadding });
      window.dispatchEvent(event);
    }
    this.manageFocusAfterClose();
    Modal.openCount = Math.max(0, Modal.openCount - 1);
  }

  manageFocusAfterClose() {
    if (this.triggeringElement) {
      if (this.triggeringElement.focus && this.props.returnFocusAfterClose) {
        this.triggeringElement.focus();
      }
      this.triggeringElement = null;
    }
  }

  setFocus() {
    if (this.modalRef.current && typeof this.modalRef.current.focus === 'function') {
      this.modalRef.current.focus();
    }
  }

  getFocusableChildren(): NodeListOf<HTMLElement> | null {
    if (this.wrapperRef.current) {
      return this.wrapperRef.current.querySelectorAll(focusableElements.join(', '));
    }
    return null;
  }

  getFocusedChild() {
    let currentFocus: HTMLElement | null = null;
    const focusableChildren = this.getFocusableChildren();

    try {
      currentFocus = document.activeElement as HTMLElement | null;
    } catch (err) {
      if (focusableChildren && focusableChildren.length > 0) {
        currentFocus = focusableChildren[0];
      }
    }
    return currentFocus;
  }

  /**
   * Check if an element's content is overflowing
   * @see https://stackoverflow.com/a/9541579
   */
  isOverflown(element: HTMLElement) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

  clearBackdropAnimationTimeout() {
    if (this.backdropAnimationTimeout.transform) {
      clearTimeout(this.backdropAnimationTimeout.transform);
      this.backdropAnimationTimeout.transform = undefined;
    }
    if (this.backdropAnimationTimeout.transition) {
      clearTimeout(this.backdropAnimationTimeout.transition);
      this.backdropAnimationTimeout.transition = undefined;
    }
  }

  handleStaticBackdropAnimation() {
    const { theme } = this.props;
    const modalRef = this.modalDialogRef.current;
    const modalDialogRef = this.modalDialogRef.current;

    // fix static backdrop animation bug when modal is not overflowing
    if (modalRef && !this.isOverflown(modalRef)) {
      modalRef.style.overflowY = 'hidden';
    }

    this.clearBackdropAnimationTimeout();

    modalDialogRef &&
      modalDialogRef.classList.add('modal-dialog-transition', 'modal-dialog-transform');

    this.backdropAnimationTimeout.transform = setTimeout(() => {
      modalDialogRef && modalDialogRef.classList.remove('modal-dialog-transform');
    }, theme.animation.timing.express);

    this.backdropAnimationTimeout.transition = setTimeout(() => {
      modalDialogRef && modalDialogRef.classList.remove('modal-dialog-transition');
      modalRef && modalRef.style.removeProperty('overflow-y');
    }, theme.animation.timing.express * 2);
  }

  handleModalMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.mouseDownElement = e.target;
  };

  handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === this.mouseDownElement) {
      e.stopPropagation();

      const modalElement = this.modalRef.current || null;

      if (modalElement && e.target === modalElement && this.props.backdrop === 'static') {
        this.handleStaticBackdropAnimation();
      }

      if (!open || this.props.backdrop !== true) return;

      if (modalElement && e.target === modalElement && this.props.toggle) {
        this.props.toggle(e);
      }
    }
  };

  handleEscape = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (this.props.open && e.key === 'Escape' && this.props.toggle) {
      if (this.props.keyboard) {
        e.preventDefault();
        e.stopPropagation();
        this.props.toggle(e);
      } else if (this.props.backdrop === 'static') {
        e.preventDefault();
        e.stopPropagation();
        this.handleStaticBackdropAnimation();
      }
    }
  };

  handleTab = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;

    const focusableChildren = this.getFocusableChildren();
    if (focusableChildren) {
      const totalFocusable = focusableChildren.length;
      if (totalFocusable === 0) return;
      const currentFocus = this.getFocusedChild();

      let focusedIndex = 0;

      for (let i = 0; i < totalFocusable; i += 1) {
        if (focusableChildren[i] === currentFocus) {
          focusedIndex = i;
          break;
        }
      }

      if (e.shiftKey && focusedIndex === 0) {
        e.preventDefault();
        focusableChildren[totalFocusable - 1].focus();
      } else if (!e.shiftKey && focusedIndex === totalFocusable - 1) {
        e.preventDefault();
        focusableChildren[0].focus();
      }
    }
  };

  handleTransitionEnter = (node: HTMLElement, isAppearing: boolean) => {
    if (this.modalRef.current) {
      const modalHeader = this.modalRef.current.getElementsByClassName('modal-header')[0];
      const modalBody = this.modalRef.current.getElementsByClassName('modal-body')[0];
      const modalFooter = this.modalRef.current.getElementsByClassName('modal-footer')[0];

      if (modalBody) {
        if (modalHeader) {
          modalBody.classList.add('modal-body-has-header');
        }
        if (modalFooter) {
          modalBody.classList.add('modal-body-has-footer');
        }
      }
    }
    this.props.onEnter && this.props.onEnter(node, isAppearing);
  };

  handletransitionEntered = (node: HTMLElement, isAppearing: boolean) => {
    this.props.onEntered && this.props.onEntered(node, isAppearing);
  };

  handleTransitionExit = (node: HTMLElement) => {
    this.props.onExit && this.props.onExit(node);
  };

  handleTransitionExited = (node: HTMLElement) => {
    this.close();
    this.setState({ open: false });
    this.props.onExited && this.props.onExited(node);
  };

  render() {
    const {
      backdrop,
      centered,
      children,
      open,
      scrollable,
      size,
      theme,
      transition: _transition,
    } = this.props;
    const transition = merge(
      { ...this.transitionDefault },
      omit(_transition, ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited']),
    );

    const styles = createStyles({
      theme,
      timeout: transition.timeout,
    });

    if (isBrowser && this.state.open) {
      return ReactDOM.createPortal(
        <div ref={this.wrapperRef} css={styles.main} tabIndex={-1}>
          <Global styles={styles.global} />
          <CSSTransition
            {...transition}
            in={open}
            onEnter={this.handleTransitionEnter}
            onEntered={this.handletransitionEntered}
            onExit={this.handleTransitionExit}
            onExited={this.handleTransitionExited}
          >
            <div
              className="modal"
              ref={this.modalRef}
              role="dialog"
              tabIndex={-1}
              onClick={this.handleModalClick}
              onMouseDown={this.handleModalMouseDown}
              onKeyUp={this.handleEscape}
              onKeyDown={this.handleTab}
            >
              <CSSTransition {...transition} in={open}>
                <div
                  ref={this.modalDialogRef}
                  className={classNames('modal-dialog', {
                    [`modal-${size}`]: size,
                    [`modal-dialog-centered`]: centered,
                    [`modal-dialog-scrollable`]: scrollable,
                  })}
                  role="document"
                >
                  <div className="modal-content">{children}</div>
                </div>
              </CSSTransition>
            </div>
          </CSSTransition>
          {backdrop && (
            <CSSTransition {...transition} in={open}>
              <div className="modal-backdrop" />
            </CSSTransition>
          )}
        </div>,
        document.body,
      );
    }

    return null;
  }
}

export default withTheme(Modal);
