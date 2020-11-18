import React from 'react';
import { ComponentWithStaticMethod } from 'kta-ui-components';
import faker from 'faker';
import MemberImage, { MemberImageProps } from './MemberImage';

type BasicArgs = MemberImageProps;

export default { component: MemberImage, title: 'Components / MemberImage' };

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  return <MemberImage {...args} />;
};

Basic.storyName = 'basic';
Basic.argTypes = {
  height: {
    name: 'height',
    defaultValue: 148,
    table: {
      type: { summary: 'number | string' },
      defaultValue: { summary: 148 },
    },
    control: { type: 'text' },
  },
  src: {
    name: 'src',
    defaultValue: faker.image.nature(),
    table: {
      type: { summary: 'string' },
    },
    control: { type: 'text' },
  },
  width: {
    name: 'width',
    defaultValue: '100%',
    table: {
      type: { summary: 'number | string' },
      defaultValue: { summary: '"100%"' },
    },
    control: { type: 'text' },
  },
};
