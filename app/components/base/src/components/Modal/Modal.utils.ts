import { TransitionStatus } from 'react-transition-group/Transition';

export class TransitionClassName {
  classNames: Array<string> = [];

  generate = (state: TransitionStatus) => {
    if (state === 'exited') {
      if (this.classNames.length === 0 || this.classNames.includes('exit-done')) {
        this.classNames = ['enter'];
      } else {
        this.classNames = ['exit-done'];
      }
    } else if (state === 'entering') {
      this.classNames[1] = 'enter-active';
    } else if (state === 'entered') {
      if (this.classNames.includes('enter-done')) {
        this.classNames = ['exit'];
      } else {
        this.classNames = ['enter-done'];
      }
    } else if (state === 'exiting') {
      this.classNames[1] = 'exit-active';
    }

    return this.classNames.join(' ');
  };

  reset = () => {
    this.classNames = [];
  };
}

// https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/js/src/modal.js#L436-L443
export function getScrollbarWidth() {
  const scrollDiv = document.createElement('div');
  // .modal-scrollbar-measure styles // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/scss/_modal.scss#L106-L113
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

export function setScrollbarWidth(padding: number) {
  if (padding > 0) {
    document.body.style.paddingRight = `${padding}px`;
  } else {
    document.body.style.removeProperty('padding-right');
  }
}

export function isBodyOverflowing() {
  return document.body.clientWidth < window.innerWidth;
}

export function getOriginalBodyPadding() {
  const style = window.getComputedStyle(document.body, null);

  return parseInt((style && style.getPropertyValue('padding-right')) || '0', 10);
}

export function conditionallyUpdateScrollbar(bodyPadding: number) {
  const scrollbarWidth = getScrollbarWidth();
  const totalPadding = bodyPadding + scrollbarWidth;

  if (isBodyOverflowing()) {
    setScrollbarWidth(totalPadding);
    return totalPadding;
  }

  return bodyPadding;
}

export const focusableElements = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type=hidden])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'object',
  'embed',
  '[tabindex]:not(.modal)',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
];
