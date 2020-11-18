import React from 'react';
import { ComponentWithStaticMethod, NoUndefinedField } from 'kta-ui-components';
import Spinner, { SpinnerProps } from './Spinner';

type RequiredButtonProps = NoUndefinedField<SpinnerProps>;
type Size = RequiredButtonProps['size'];
type Variant = RequiredButtonProps['variant'];
type BasicArgs = SpinnerProps;

export default { component: Spinner, title: 'Components / Spinner' };

const sizeOptions: {
  [key in Size]: Size;
} = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

const variantOptions: {
  [key in Variant]: Variant;
} = {
  light: 'light',
  lightSecondary: 'lightSecondary',
  primary: 'primary',
  secondary: 'secondary',
  destructive: 'destructive',
};

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  return <Spinner {...args} />;
};

Basic.storyName = 'basic';
Basic.argTypes = {
  size: {
    name: 'size',
    defaultValue: 'md',
    table: {
      type: { summary: 'enum' },
      defaultValue: { summary: '"md"' },
    },
    control: { type: 'select', options: sizeOptions },
  },
  variant: {
    name: 'variant',
    defaultValue: 'primary',
    table: {
      type: { summary: 'enum' },
      defaultValue: { summary: '"primary"' },
    },
    control: { type: 'select', options: variantOptions },
  },
};
