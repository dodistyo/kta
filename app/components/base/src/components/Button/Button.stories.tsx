import React, { Fragment } from 'react';
import { Global, css } from '@emotion/core';
import { ComponentWithStaticMethod, NoUndefinedField } from 'kta-ui-components';
import Button, { ButtonProps } from './Button';

type RequiredButtonProps = NoUndefinedField<ButtonProps>;
type BasicArgs = Pick<
  ButtonProps,
  'children' | 'disabled' | 'loading' | 'rounded' | 'size' | 'variant'
> & {
  iconName: RequiredButtonProps['icon']['name'];
  iconPlacement: RequiredButtonProps['icon']['placement'];
  iconPrefix: RequiredButtonProps['icon']['prefix'];
};

export default { component: Button, title: 'Components / Button' };

const iconPositionOptions: {
  [key in RequiredButtonProps['icon']['placement']]: RequiredButtonProps['icon']['placement'];
} = {
  left: 'left',
  right: 'right',
};

const iconPrefixOptions: {
  [key in RequiredButtonProps['icon']['prefix']]: RequiredButtonProps['icon']['prefix'];
} = {
  fas: 'fas',
  far: 'far',
  fab: 'fab',
};

const sizeOptions: {
  [key in RequiredButtonProps['size']]: RequiredButtonProps['size'];
} = {
  sm: 'sm',
  md: 'md',
};

const variantOptions: {
  [key in RequiredButtonProps['variant']]: RequiredButtonProps['variant'];
} = {
  primary: 'primary',
  secondary: 'secondary',
  destructive: 'destructive',
  success: 'success',
  light: 'light',
  'text-primary': 'text-primary',
  'text-secondary': 'text-secondary',
  'text-destructive': 'text-destructive',
};

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  const { iconName, iconPlacement, iconPrefix, variant, ...rest } = args;

  return (
    <Fragment>
      {variant === 'light' && (
        <Global
          styles={css`
            body {
              background-color: #f0f0f0;
            }
          `}
        />
      )}
      <Button
        {...rest}
        icon={{ name: iconName, placement: iconPlacement, prefix: iconPrefix }}
        variant={variant}
      />
    </Fragment>
  );
};

// https://storybook.js.org/docs/react/api/csf
Basic.storyName = 'basic';
// Learn more about storybook control
// https://storybook.js.org/docs/react/essentials/controls
// https://www.npmjs.com/package/@storybook/addon-controls#knobs-to-manually-configured-args
Basic.argTypes = {
  children: {
    name: 'children',
    defaultValue: 'Click me!',
    type: { name: 'string', required: true },
    table: {
      type: { summary: 'string' },
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
  loading: {
    name: 'loading',
    defaultValue: false,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: { type: 'boolean' },
  },
  rounded: {
    name: 'rounded',
    defaultValue: true,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: true },
    },
    control: { type: 'boolean' },
  },
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
  iconName: {
    name: 'icon.name',
    defaultValue: 'paper-plane',
    description:
      'See list of available icons <a href="https://fontawesome.com/icons?d=listing&m=free" target="_blank" rel="noreferrer">here</a>',
    table: {
      type: { summary: 'enum' },
    },
    control: { type: 'text' },
  },
  iconPlacement: {
    name: 'icon.placement',
    defaultValue: 'left',
    table: {
      type: { summary: 'enum' },
      defaultValue: { summary: '"left"' },
    },
    control: { type: 'select', options: iconPositionOptions },
  },
  iconPrefix: {
    name: 'icon.prefix',
    defaultValue: 'fas',
    description: '<b>fas</b> is for Solid, <b>far</b> is for Regular, and <b>fab</b> is for Brand.',
    table: {
      type: { summary: 'enum' },
      defaultValue: { summary: '"fas"' },
    },
    control: { type: 'select', options: iconPrefixOptions },
  },
};
