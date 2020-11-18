/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { ComponentWithStaticMethod } from 'kta-ui-components';
import LeafletMapDisplay from './LeafletMapDisplay';

type BasicArgs = unknown;

export default { component: LeafletMapDisplay, title: 'Components / LeafletMapDisplay' };

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  return <LeafletMapDisplay {...args} />;
};

Basic.storyName = 'basic';
Basic.argTypes = {};
