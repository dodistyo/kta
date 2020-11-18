import React from 'react';
import { ComponentWithStaticMethod } from 'kta-ui-components';
import ForgotPassword from './ForgotPassword';

type BasicArgs = unknown;

export default { component: ForgotPassword, title: 'Static Pages / ForgotPassword' };

export const Basic: ComponentWithStaticMethod<BasicArgs> = () => {
  return <ForgotPassword />;
};

// https://storybook.js.org/docs/react/api/csf
Basic.storyName = 'basic';
// Learn more about storybook control
// https://storybook.js.org/docs/react/essentials/controls
// https://www.npmjs.com/package/@storybook/addon-controls#knobs-to-manually-configured-args
Basic.argTypes = {};
