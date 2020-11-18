/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import createStyles from './Dropdown.styles';
import DropdownContext from './Dropdown.context';

export type DropdownItemInjectedProps = {
  children?: React.ReactNode;
  className?: string;
  disabled: boolean;
  role: string;
  style?: React.CSSProperties;
  tabIndex: number;
};

export type DropdownItemProps = Pick<
  DropdownItemInjectedProps,
  'children' | 'className' | 'style'
> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    component?: React.ComponentType<DropdownItemInjectedProps>;
    disabled?: boolean;
    role?: string;
    tabIndex?: number;
  };

const DefaultComponent = (injectedProps: DropdownItemInjectedProps) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  return <button {...injectedProps} css={styles.menuItem} />;
};

const DropdownItem: React.FC<DropdownItemProps> = props => {
  const {
    children,
    className,
    component: Component,
    disabled = false,
    role = 'menuitem',
    style,
    tabIndex = 0,
    ...rest
  } = props;
  const context = React.useContext(DropdownContext);
  const injectedProps: DropdownItemInjectedProps = {
    ...rest,
    children,
    className,
    disabled,
    role,
    style: {
      ...style,
      // mouse events don't fire on disabled elements (browser behavior),
      // so hover is going to fail there.
      // This can be solved with CSS: pointer-events: all;
      ...{ pointerEvents: disabled && context.props.trigger === 'hover' ? 'none' : undefined },
    },
    tabIndex,
  };
  const FinalComponent = Component || DefaultComponent;

  return <FinalComponent {...injectedProps} />;
};

export default DropdownItem;
