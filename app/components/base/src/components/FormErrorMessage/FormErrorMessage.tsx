/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';

export type FormErrorMessageProps = React.HTMLAttributes<HTMLDivElement>;

const FormErrorMessage: React.FC<FormErrorMessageProps> = props => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return <small {...props} css={styles.container} />;
};

const createStyles = (t: Theme) => {
  return {
    container: css`
      display: block;
      margin-top: ${t.spacing.xxs}px;
      font-size: ${t.typography.size.small}px;
      color: ${t.color.redPrimary};
    `,
  };
};

export default FormErrorMessage;
