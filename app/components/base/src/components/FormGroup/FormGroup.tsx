/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';

export type FormGroupProps = React.HTMLAttributes<HTMLDivElement>;

const FormGroup: React.FC<FormGroupProps> = props => {
  const theme = useTheme<Theme>();

  return (
    <div
      {...props}
      css={css`
        margin-bottom: ${theme.spacing.m}px;
      `}
    />
  );
};

export default FormGroup;
