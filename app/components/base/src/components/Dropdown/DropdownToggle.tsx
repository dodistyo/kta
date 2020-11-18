import React from 'react';
import omit from 'lodash/omit';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import DropdownContext, { DropdownContextProps } from './Dropdown.context';
import Button, { ButtonProps } from '../Button/Button';

export type DropdownToggleInjectedProps = {
  children: React.ReactNode;
  className?: string;
  disabled: boolean;
  iconName: IconName;
  menu: {
    placement: DropdownContextProps['props']['menu']['placement'];
  };
};

export type DropdownToggleProps = ButtonProps & {
  component?: React.ComponentType<DropdownToggleInjectedProps>;
};

const DefaultComponent = React.forwardRef<HTMLButtonElement, DropdownToggleInjectedProps>(
  (injectedProps, ref) => {
    const { iconName, ...rest } = omit(injectedProps, ['menu']);
    return <Button ref={ref} {...rest} icon={{ name: iconName, placement: 'right' }} />;
  },
);

const DropdownToggle: React.FC<DropdownToggleProps> = props => {
  const { children, className, component: Component, disabled = false, ...rest } = props;
  const { setToggleElem, props: contextProps } = React.useContext(DropdownContext);

  const injectedProps: DropdownToggleInjectedProps = {
    ...rest,
    children,
    className,
    disabled: contextProps.disabled || disabled,
    iconName: contextProps.menu.placement.indexOf('bottom') !== -1 ? 'caret-down' : 'caret-up',
    menu: { placement: contextProps.menu.placement },
  };
  const FinalComponent = Component || DefaultComponent;

  // Component should accept `ref`
  return <FinalComponent ref={setToggleElem} {...injectedProps} />;
};

export default DropdownToggle;
