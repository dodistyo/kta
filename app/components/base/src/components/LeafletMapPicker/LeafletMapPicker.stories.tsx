/** @jsx jsx */
/* eslint-disable no-console */
import React, { Fragment } from 'react';
import { jsx, css } from '@emotion/core';
import { ComponentWithStaticMethod } from 'kta-ui-components';
import LeafletMapPicker from './LeafletMapPicker';

type BasicArgs = unknown;

export default { component: LeafletMapPicker, title: 'Components / LeafletMapPicker' };

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  const [value, setValue] = React.useState<{ lat?: number; lng?: number; address?: string }>({});

  const handleChange = (values: { lat?: number; lng?: number; address?: string }) => {
    setValue(values);
  };

  return (
    <Fragment>
      <LeafletMapPicker
        {...args}
        onChange={handleChange}
        css={css`
          margin-bottom: 16px;
        `}
      />
      <p>
        <b>Latitude:</b> {value.lat || '-'}
        <br />
        <b>Longitude:</b> {value.lng || '-'}
        <br />
        <b>Address:</b> {value.address || '-'}
      </p>
    </Fragment>
  );
};

Basic.storyName = 'basic';
Basic.argTypes = {};
