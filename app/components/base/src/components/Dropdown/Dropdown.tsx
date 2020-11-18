import React from 'react';
import merge from 'lodash/merge';
import DropdownContext, { DropdownContextProps } from './Dropdown.context';

export type DropdownProps = {
  children: React.ReactNode;
  /** @default false */
  disabled?: boolean;
  menu?: {
    /** @default "raised" */
    elevation?: DropdownContextProps['props']['menu']['elevation'];
    /** @default "bottom" */
    placement?: DropdownContextProps['props']['menu']['placement'];
    /** @default { timeout: 0 } */
    transition?: DropdownContextProps['props']['menu']['transition'];
  };
  /** @default false */
  open?: boolean;
  /** @default "click" */
  trigger?: DropdownContextProps['props']['trigger'];
};

const Dropdown: React.FC<DropdownProps> = props => {
  const { children, disabled = false, menu: _menu, open: _open = false, trigger = 'click' } = props;
  const [open, setOpen] = React.useState<boolean>(trigger === 'manual' ? _open : false);
  const [toggleElem, setToggleElem] = React.useState<HTMLElement | null>(null);
  const defaultMenuProps: DropdownContextProps['props']['menu'] = {
    elevation: 'raised',
    placement: 'bottom',
    transition: { timeout: 0 },
  };

  return (
    <DropdownContext.Provider
      value={{
        props: {
          disabled,
          menu: merge(defaultMenuProps, _menu),
          open: _open,
          trigger,
        },
        open,
        setOpen,
        toggleElem,
        setToggleElem,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

export default Dropdown;
