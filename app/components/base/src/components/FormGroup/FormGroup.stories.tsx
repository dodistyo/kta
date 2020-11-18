import React from 'react';
import { ComponentWithStaticMethod } from 'kta-ui-components';
import FormGroup from './FormGroup';
import Label from '../Label/Label';
import Input from '../Input/Input';

type BasicArgs = unknown;

export default { component: FormGroup, title: 'Components / FormGroup' };

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  return (
    <FormGroup {...args}>
      <Label>Label</Label>
      <Input placeholder="Input" />
    </FormGroup>
  );
};

Basic.storyName = 'basic';
