import React from 'react';
import { ComponentWithStaticMethod, NoUndefinedField } from 'kta-ui-components';
import Input, { InputProps } from './Input';
import Icon from '../Icon/Icon';

type RequiredInputProps = NoUndefinedField<InputProps>;
type BasicArgs = Pick<InputProps, 'description' | 'disabled' | 'placeholder'> & {
  addonContent: RequiredInputProps['addon']['content'];
  addonPlacement: RequiredInputProps['addon']['placement'];
};

export default { component: Input, title: 'Components / Input' };

const addonPositionOptions: {
  [key in RequiredInputProps['addon']['placement']]: RequiredInputProps['addon']['placement'];
} = {
  left: 'left',
  right: 'right',
};

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  const { addonContent, addonPlacement, ...rest } = args;
  return <Input {...rest} addon={{ content: addonContent, placement: addonPlacement }} />;
};

Basic.storyName = 'basic';
Basic.argTypes = {
  addonContent: {
    name: 'addon.content',
    defaultValue: '',
    table: {
      type: { summary: 'react node' },
    },
    control: { type: 'text' },
  },
  addonPlacement: {
    name: 'addon.placement',
    defaultValue: 'left',
    table: {
      type: { summary: 'enum' },
      defaultValue: { summary: '"left"' },
    },
    control: { type: 'select', options: addonPositionOptions },
  },
  description: {
    name: 'description',
    defaultValue: 'Example description',
    table: {
      type: { summary: 'react node' },
    },
    control: { type: 'text' },
  },
  disabled: {
    name: 'disabled',
    defaultValue: false,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: { type: 'boolean' },
  },
  placeholder: {
    name: 'placeholder',
    defaultValue: 'placeholder',
    table: {
      type: { summary: 'string' },
    },
    control: { type: 'text' },
  },
};

export const TypePassword: ComponentWithStaticMethod<BasicArgs> = () => {
  return <Input placeholder="placeholder" description="Example description" type="password" />;
};

TypePassword.storyName = 'type="password"';

export const AddonIcon: ComponentWithStaticMethod<BasicArgs> = () => {
  return (
    <Input
      placeholder="placeholder"
      description="Example description"
      addon={{ content: <Icon name="calendar-alt" /> }}
    />
  );
};

AddonIcon.storyName = 'addon icon';

export const ErrorState: ComponentWithStaticMethod<BasicArgs> = () => {
  return (
    <Input
      placeholder="placeholder"
      description="Example description"
      errorMessage="Example error message"
    />
  );
};

ErrorState.storyName = 'error state';
