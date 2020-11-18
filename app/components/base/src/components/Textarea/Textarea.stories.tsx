import React from 'react';
import { ComponentWithStaticMethod } from 'kta-ui-components';
import Textarea, { TextareaProps } from './Textarea';

type BasicArgs = TextareaProps;

export default { component: Textarea, title: 'Components / Textarea' };

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  return <Textarea {...args} />;
};

Basic.storyName = 'basic';
Basic.argTypes = {
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
  rows: {
    name: 'rows',
    defaultValue: '3',
    table: {
      type: { summary: 'number' },
      defaultValue: { summary: 3 },
    },
    control: { type: 'number' },
  },
};

export const ErrorState: ComponentWithStaticMethod<BasicArgs> = () => {
  return (
    <Textarea
      placeholder="placeholder"
      description="Example description"
      errorMessage="Example error message"
    />
  );
};

ErrorState.storyName = 'error state';
