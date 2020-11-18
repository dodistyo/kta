import React from 'react';
import { ComponentWithStaticMethod, NoUndefinedField } from 'kta-ui-components';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import Icon, { IconProps } from './Icon';

type RequiredContainerProps = NoUndefinedField<IconProps>;
type Prefix = RequiredContainerProps['prefix'];
type BasicArgs = IconProps;

export default { component: Icon, title: 'Components / Icon' };

const prefixOptions: {
  [key in Prefix]: Prefix;
} = {
  fas: 'fas',
  far: 'far',
  fab: 'fab',
};

const sizeOptions: { [key in SizeProp]: SizeProp } = {
  xs: 'xs',
  lg: 'lg',
  sm: 'sm',
  '1x': '1x',
  '2x': '2x',
  '3x': '3x',
  '4x': '4x',
  '5x': '5x',
  '6x': '6x',
  '7x': '7x',
  '8x': '8x',
  '9x': '9x',
  '10x': '10x',
};

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  const { name, prefix, size } = args;

  return (
    <div>
      <p>
        Icon is from <strong>Font Awesome</strong> (free version)
        <br />
        See list of available icons{' '}
        <a href="https://fontawesome.com/icons?d=listing&m=free" target="_blank" rel="noreferrer">
          here
        </a>
      </p>
      <Icon name={name} prefix={prefix} size={size} />
    </div>
  );
};

Basic.storyName = 'basic';
Basic.argTypes = {
  name: {
    name: 'name',
    defaultValue: 'kaaba',
    type: { name: 'string', required: true },
    table: {
      type: { summary: 'string' },
    },
    control: { type: 'text' },
  },
  prefix: {
    name: 'prefix',
    defaultValue: 'fas',
    description: '<b>fas</b> is for Solid, <b>far</b> is for Regular, and <b>fab</b> is for Brand.',
    table: {
      type: { summary: 'enum' },
      defaultValue: { summary: '"fas"' },
    },
    control: { type: 'select', options: prefixOptions },
  },
  size: {
    name: 'size',
    defaultValue: '5x',
    table: {
      type: { summary: 'enum' },
      defaultValue: { summary: '"1x"' },
    },
    control: { type: 'select', options: sizeOptions },
  },
};
