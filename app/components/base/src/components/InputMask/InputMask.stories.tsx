import React from 'react';
import { ComponentWithStaticMethod, NoUndefinedField } from 'kta-ui-components';
import InputMask, { InputMaskProps } from './InputMask';
import Icon from '../Icon/Icon';

type RequiredInputMaskProps = NoUndefinedField<InputMaskProps>;
type BasicArgs = Pick<
  InputMaskProps,
  | 'description'
  | 'disabled'
  | 'placeholder'
  | 'guide'
  | 'keepCharPositions'
  | 'mask'
  | 'placeholderChar'
> & {
  addonContent: RequiredInputMaskProps['addon']['content'];
  addonPlacement: RequiredInputMaskProps['addon']['placement'];
};

export default { component: InputMask, title: 'Components / InputMask' };

const addonPositionOptions: {
  [key in RequiredInputMaskProps['addon']['placement']]: RequiredInputMaskProps['addon']['placement'];
} = {
  left: 'left',
  right: 'right',
};

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  const { addonContent, addonPlacement, ...rest } = args;
  return <InputMask {...rest} addon={{ content: addonContent, placement: addonPlacement }} />;
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
  guide: {
    name: 'guide',
    defaultValue: true,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: true },
    },
    control: { type: 'boolean' },
  },
  keepCharPositions: {
    name: 'keepCharPositions',
    defaultValue: false,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: { type: 'boolean' },
  },
  mask: {
    name: 'mask',
    defaultValue: [
      '(',
      /[1-9]/,
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
    type: { required: true },
    table: {
      type: { summary: 'array | function | false' },
    },
    control: { type: 'array' },
  },
  placeholder: {
    name: 'placeholder',
    defaultValue: 'Enter a phone number',
    table: {
      type: { summary: 'string' },
    },
    control: { type: 'text' },
  },
  placeholderChar: {
    name: 'placeholderChar',
    defaultValue: '_',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '"_"' },
    },
    control: { type: 'text' },
  },
};

export const AddonIcon: ComponentWithStaticMethod<BasicArgs> = () => {
  return (
    <InputMask
      placeholder="placeholder"
      description="Example description"
      addon={{ content: <Icon name="calendar-alt" /> }}
    />
  );
};

AddonIcon.storyName = 'addon icon';

export const ErrorState: ComponentWithStaticMethod<BasicArgs> = () => {
  return (
    <InputMask
      placeholder="placeholder"
      description="Example description"
      errorMessage="Example error message"
    />
  );
};

ErrorState.storyName = 'error state';
