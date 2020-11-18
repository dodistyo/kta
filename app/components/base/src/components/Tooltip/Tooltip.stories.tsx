import React from 'react';
import { Global, css } from '@emotion/core';
import { ComponentWithStaticMethod, NoUndefinedField } from 'kta-ui-components';
import Icon from '../Icon/Icon';
import Tooltip from './Tooltip';
import styled from '../../styled';

type TooltipProps = JSX.LibraryManagedAttributes<
  typeof Tooltip,
  React.ComponentProps<typeof Tooltip>
>;
type RequiredTooltipProps = NoUndefinedField<TooltipProps>;
type Trigger = RequiredTooltipProps['trigger'];
type Placement = RequiredTooltipProps['placement'];

type BasicArgs = Pick<TooltipProps, 'children' | 'open' | 'placement' | 'trigger'>;

export default { title: 'Components / Tooltip', component: Tooltip };

const placementOptions: {
  [key in Placement]: Placement;
} = {
  auto: 'auto',
  'auto-start': 'auto-start',
  'auto-end': 'auto-end',
  top: 'top',
  'top-start': 'top-start',
  'top-end': 'top-end',
  bottom: 'bottom',
  'bottom-start': 'bottom-start',
  'bottom-end': 'bottom-end',
  right: 'right',
  'right-start': 'right-start',
  'right-end': 'right-end',
  left: 'left',
  'left-start': 'left-start',
  'left-end': 'left-end',
};

const triggerOptions: {
  [key in Trigger]: Trigger;
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

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
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
      <Icon name="kaaba" size="5x" id="target-tooltip" focusable tabIndex={0} />
      <Tooltip {...args} target="#target-tooltip" />
    </Wrapper>
  );
};

Basic.storyName = 'basic';
Basic.argTypes = {
  children: {
    name: 'children',
    defaultValue: 'Kaaba',
    table: {
      type: { summary: 'react node' },
    },
    control: { type: 'text' },
  },
  placement: {
    name: 'placement',
    defaultValue: 'top',
    table: {
      type: { summary: 'enum' },
      defaultValue: { summary: '"auto"' },
    },
    control: { type: 'select', options: placementOptions },
  },
  trigger: {
    name: 'trigger',
    defaultValue: 'hover',
    table: {
      type: { summary: 'enum' },
      defaultValue: { summary: '"hover"' },
    },
    control: { type: 'select', options: triggerOptions },
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
};
