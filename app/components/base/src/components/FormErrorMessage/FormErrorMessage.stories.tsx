import React from 'react';
import { ComponentWithStaticMethod } from 'kta-ui-components';
import FormErrorMessage, { FormErrorMessageProps } from './FormErrorMessage';

type BasicArgs = FormErrorMessageProps;

export default { component: FormErrorMessage, title: 'Components / FormErrorMessage' };

export const Basic: ComponentWithStaticMethod<BasicArgs> = () => {
  return <FormErrorMessage>Example error message</FormErrorMessage>;
};

Basic.storyName = 'basic';
Basic.argTypes = {};
