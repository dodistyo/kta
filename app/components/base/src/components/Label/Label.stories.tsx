import React from 'react';
import { ComponentWithStaticMethod } from 'kta-ui-components';
import Label, { LabelProps } from './Label';

type BasicArgs = LabelProps;

export default { component: Label, title: 'Components / Label' };

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  return <Label {...args} />;
};

Basic.storyName = 'basic';
Basic.argTypes = {
  children: {
    name: 'children',
    defaultValue: 'Label',
    type: { name: 'string', required: true },
    table: {
      type: { summary: 'react node' },
    },
    control: { type: 'text' },
  },
  hint: {
    name: 'hint',
    defaultValue: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    table: {
      type: { summary: 'react node' },
    },
    control: { type: 'text' },
  },
  required: {
    name: 'required',
    defaultValue: true,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: { type: 'boolean' },
  },
};
