import isString from 'lodash/isString';

export type TargetPropType = string | React.RefObject<HTMLElement>;

function getTarget(target: TargetPropType) {
  if (target && typeof target === 'object' && 'current' in target) {
    return target.current;
  } else if (isString(target)) {
    let selection = document.querySelectorAll(target);
    if (!selection.length) {
      selection = document.querySelectorAll(`#${target}`);
    }
    if (!selection.length) {
      console.warn(
        `The target '${target}' could not be identified in the dom, tip: check spelling`,
      );
      return null;
    }
    if (selection instanceof NodeList) {
      const elsArr = Array.from(selection);
      return elsArr[0] as HTMLElement;
    }
  }
  return null;
}

export default getTarget;
