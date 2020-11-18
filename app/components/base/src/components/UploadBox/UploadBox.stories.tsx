import React from 'react';
import { ComponentWithStaticMethod } from 'kta-ui-components';
import UploadBox, { UploadBoxProps } from './UploadBox';
import Icon from '../Icon/Icon';

type BasicArgs = UploadBoxProps;

export default { component: UploadBox, title: 'Components / UploadBox' };

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  return <UploadBox {...args} />;
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
  focusable: {
    name: 'focusable',
    defaultValue: true,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: true },
    },
    control: { type: 'boolean' },
  },
  label: {
    name: 'label',
    defaultValue: 'Choose a file',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '"Choose a file"' },
    },
    control: { type: 'text' },
  },
  labelCaption: {
    name: 'labelCaption',
    defaultValue: 'or drag it here',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '"or drag it here"' },
    },
    control: { type: 'text' },
  },
  loading: {
    name: 'loading',
    defaultValue: false,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: { type: 'boolean' },
  },
  multiple: {
    name: 'multiple',
    defaultValue: false,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: { type: 'boolean' },
  },
  placeholder: {
    name: 'placeholder',
    defaultValue: 'Placeholder',
    table: {
      type: { summary: 'react node' },
      defaultValue: { summary: '"Placeholder"' },
    },
    control: { type: 'text' },
  },
};

export const ErrorState: ComponentWithStaticMethod<BasicArgs> = args => {
  return (
    <UploadBox {...args} description="Example description" errorMessage="Example error message" />
  );
};

ErrorState.storyName = 'error state';

export const Test: ComponentWithStaticMethod<BasicArgs> = args => {
  return (
    <UploadBox
      {...args}
      placeholder={
        <span>
          <Icon name="camera" />
          &nbsp;&nbsp;Unggah Foto/Scan KTP
        </span>
      }
      label="Pilih file"
      labelCaption="atau drag ke sini"
      description="Besar maksimum file: 2MB"
    />
  );
};

Test.storyName = 'test';
