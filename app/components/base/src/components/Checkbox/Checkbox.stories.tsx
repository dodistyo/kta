import React, { Fragment } from 'react';
import { ComponentWithStaticMethod } from 'kta-ui-components';
import Checkbox, { CheckboxProps } from './Checkbox';

type BasicArgs = CheckboxProps;

export default { component: Checkbox, title: 'Components / Checkbox' };

export const Basic: ComponentWithStaticMethod<BasicArgs> = () => {
  return (
    <Fragment>
      <Checkbox label="Example Label" defaultChecked />
      <Checkbox label="Example Label" />
    </Fragment>
  );
};

Basic.storyName = 'basic';
Basic.argTypes = {};

export const Inline: ComponentWithStaticMethod<BasicArgs> = () => {
  return (
    <Fragment>
      <Checkbox label="Example Label" defaultChecked inline />
      <Checkbox label="Example Label" inline />
    </Fragment>
  );
};

Inline.storyName = 'inline';
Inline.argTypes = {};
