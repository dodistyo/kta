import React from 'react';
import { ComponentWithStaticMethod } from 'kta-ui-components';
import QRCode, { QRCodeProps } from './QRCode';

type BasicArgs = QRCodeProps & {
  colorDark: string;
  colorLight: string;
};

export default { component: QRCode, title: 'Components / QRCode' };

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  const { colorDark, colorLight, ...rest } = args;

  return <QRCode {...rest} color={{ dark: colorDark, light: colorLight }} />;
};

// https://storybook.js.org/docs/react/api/csf
Basic.storyName = 'basic';
// Learn more about storybook control
// https://storybook.js.org/docs/react/essentials/controls
// https://www.npmjs.com/package/@storybook/addon-controls#knobs-to-manually-configured-args
Basic.argTypes = {
  colorDark: {
    name: 'color.dark',
    defaultValue: '#212529',
    table: {
      type: { summary: 'text' },
      defaultValue: { summary: '"#212529"' },
    },
    control: { type: 'text' },
  },
  colorLight: {
    name: 'color.light',
    defaultValue: '#ffffff',
    table: {
      type: { summary: 'text' },
      defaultValue: { summary: '"#ffffff"' },
    },
    control: { type: 'text' },
  },
  text: {
    name: 'text',
    defaultValue: 'google.com',
    type: { name: 'string', required: true },
    table: {
      type: { summary: 'text' },
    },
    control: { type: 'text' },
  },
  width: {
    name: 'width',
    defaultValue: 120,
    description: "width can't be less than <b>21</b>",
    table: {
      type: { summary: 'number' },
      defaultValue: { summary: 120 },
    },
    control: { type: 'number', min: 21 },
  },
};
