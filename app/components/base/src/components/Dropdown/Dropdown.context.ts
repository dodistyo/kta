import React from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import { Theme } from '../../theme';

export type DropdownContextProps = {
  props: {
    disabled: boolean;
    open: boolean;
    trigger: 'click' | 'hover' | 'focus' | 'manual';
    menu: {
      elevation: 'none' | keyof Theme['elevation'];
      placement: 'bottom' | 'bottom-start' | 'bottom-end' | 'top' | 'top-start' | 'top-end';
      transition: CSSTransitionProps;
    };
  };
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleElem: HTMLElement | null;
  setToggleElem: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
};

const DropdownContext = React.createContext<DropdownContextProps>({
  props: {
    disabled: false,
    open: false,
    trigger: 'click',
    menu: {
      elevation: 'raised',
      placement: 'bottom',
      transition: { timeout: 0 },
    },
  },
  open: false,
  setOpen: () => {},
  toggleElem: null,
  setToggleElem: () => {},
});

export default DropdownContext;
