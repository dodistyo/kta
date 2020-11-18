/** @jsx jsx */
import React from 'react';
import { ComponentWithStaticMethod, NoUndefinedField } from 'kta-ui-components';

import { Global, css, jsx } from '@emotion/core';
import styled from '../../styled';
import { Theme } from '../../theme';
import { useTheme } from 'emotion-theming';
import omit from 'lodash/omit';
import createStyles from './Dropdown.styles';

import Icon from '../Icon/Icon';
import Dropdown, { DropdownProps } from './Dropdown';
import DropdownToggle, { DropdownToggleInjectedProps } from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import DropdownItem, { DropdownItemInjectedProps } from './DropdownItem';

type RequiredDropdownProps = NoUndefinedField<DropdownProps>;
type StoryArgs = Pick<RequiredDropdownProps, 'disabled' | 'open' | 'trigger'> & {
  menuElevation: RequiredDropdownProps['menu']['elevation'];
  menuPlacement: RequiredDropdownProps['menu']['placement'];
};

export default {
  title: 'Components / Dropdown',
  component: Dropdown,
  subcomponents: [DropdownToggle],
};

const menuElevationOptions: {
  [key in RequiredDropdownProps['menu']['elevation']]: RequiredDropdownProps['menu']['elevation'];
} = {
  none: 'none',
  container: 'container',
  raised: 'raised',
  float: 'float',
  hover: 'hover',
};

const menuPlacementOptions: {
  [key in RequiredDropdownProps['menu']['placement']]: RequiredDropdownProps['menu']['placement'];
} = {
  top: 'top',
  'top-start': 'top-start',
  'top-end': 'top-end',
  bottom: 'bottom',
  'bottom-start': 'bottom-start',
  'bottom-end': 'bottom-end',
};

const triggerOptions: {
  [key in RequiredDropdownProps['trigger']]: RequiredDropdownProps['trigger'];
} = {
  click: 'click',
  hover: 'hover',
  focus: 'focus',
  manual: 'manual',
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomDropdownItem: React.FC<DropdownItemInjectedProps> = props => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const customStyles = css`
    color: ${theme.color.bluePrimary};

    &:hover:not([disabled]) {
      color: ${theme.color.bluePrimary};
    }
  `;

  return <a {...props} css={[styles.menuItem, customStyles]} />;
};

export const Basic: ComponentWithStaticMethod<StoryArgs> = args => {
  const { disabled, menuElevation, menuPlacement, open, trigger } = args;
  return (
    <Wrapper>
      <Global
        styles={css`
          html,
          body,
          #root {
            width: 100%;
            height: 100%;
          }
        `}
      />
      <Dropdown
        disabled={disabled}
        menu={{ elevation: menuElevation, placement: menuPlacement }}
        open={open}
        trigger={trigger}
      >
        <DropdownToggle>Dropdown</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Some Action</DropdownItem>
          <DropdownItem component={CustomDropdownItem}>Custom Component</DropdownItem>
          <DropdownItem disabled>Some Action (disabled)</DropdownItem>
          <DropdownItem>Some Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Wrapper>
  );
};

Basic.storyName = 'basic';
Basic.argTypes = {
  disabled: {
    name: 'disabled',
    defaultValue: false,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: { type: 'boolean' },
  },
  open: {
    name: 'open',
    defaultValue: false,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: { type: 'boolean' },
  },
  trigger: {
    name: 'trigger',
    defaultValue: 'click',
    table: {
      type: { summary: 'enum' },
      defaultValue: { summary: '"click"' },
    },
    control: { type: 'select', options: triggerOptions },
  },
  menuElevation: {
    name: 'menu.elevation',
    defaultValue: 'raised',
    table: {
      type: { summary: 'enum' },
      defaultValue: { summary: '"raised"' },
    },
    control: { type: 'select', options: menuElevationOptions },
  },
  menuPlacement: {
    name: 'menu.placement',
    defaultValue: 'bottom',
    table: {
      type: { summary: 'enum' },
      defaultValue: { summary: '"bottom"' },
    },
    control: { type: 'select', options: menuPlacementOptions },
  },
};

const CustomDropdownToggle = React.forwardRef<HTMLDivElement, DropdownToggleInjectedProps>(
  (props, ref) => {
    const { children, iconName, ...rest } = omit(props, ['disabled', 'menu']);
    const theme = useTheme<Theme>();

    const styles = css`
      display: flex;
      align-items: center;
      cursor: pointer;

      svg {
        margin-left: ${theme.spacing.xs}px;
      }
    `;

    return (
      <div {...rest} ref={ref} css={styles}>
        <span>{children}</span>
        <Icon name={iconName} />
      </div>
    );
  },
);

export const CustomToggleComponent: ComponentWithStaticMethod<StoryArgs> = args => {
  const { disabled, menuPlacement, open, trigger } = args;
  return (
    <Wrapper>
      <Global
        styles={css`
          html,
          body,
          #root {
            width: 100%;
            height: 100%;
          }
        `}
      />
      <Dropdown
        disabled={disabled}
        menu={{ placement: menuPlacement }}
        open={open}
        trigger={trigger}
      >
        <DropdownToggle component={CustomDropdownToggle}>user@pks.id</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Some Action</DropdownItem>
          <DropdownItem component={CustomDropdownItem}>Custom Component</DropdownItem>
          <DropdownItem disabled>Some Action (disabled)</DropdownItem>
          <DropdownItem>Some Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Wrapper>
  );
};

CustomToggleComponent.storyName = 'custom toggle component';
CustomToggleComponent.argTypes = Basic.argTypes;
