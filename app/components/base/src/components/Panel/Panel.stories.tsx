import React from 'react';
import { ComponentWithStaticMethod, NoUndefinedField } from 'kta-ui-components';
import Panel, { PanelProps } from './Panel';

type RequiredPanelProps = NoUndefinedField<PanelProps>;
type BasicArgs = PanelProps;

export default { component: Panel, title: 'Components / Panel' };

const elevationOptions: {
  [key in RequiredPanelProps['elevation']]: RequiredPanelProps['elevation'];
} = {
  none: 'none',
  container: 'container',
  raised: 'raised',
  float: 'float',
  hover: 'hover',
};

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  return (
    <Panel {...args}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam necessitatibus id nemo debitis
      sunt sint, quia voluptas praesentium odio accusamus neque quasi voluptatem. Ea quas totam
      facilis a magnam deserunt.
    </Panel>
  );
};

Basic.storyName = 'basic';
Basic.argTypes = {
  elevation: {
    name: 'elevation',
    defaultValue: 'float',
    table: {
      type: { summary: 'enum' },
      defaultValue: { summary: '"float"' },
    },
    control: { type: 'select', options: elevationOptions },
  },
};
