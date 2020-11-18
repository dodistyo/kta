/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import omit from 'lodash/omit';
import { Theme } from '../../theme';
import createStyles from './Spinner.styles';

export type SpinnerProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** @default 'primary' */
  variant?: 'light' | 'lightSecondary' | 'primary' | 'secondary' | 'destructive';
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
};

const Spinner: React.FC<SpinnerProps> = props => {
  const theme = useTheme<Theme>();
  const { size = 'md', variant = 'primary', ...rest } = omit(props, ['children']);
  const styles = createStyles(theme);

  return (
    <span
      {...rest}
      css={[
        styles.base,
        variant === 'light' && styles.light,
        variant === 'lightSecondary' && styles.lightSecondary,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'destructive' && styles.destructive,
        size === 'sm' && styles.small,
        size === 'md' && styles.medium,
        size === 'lg' && styles.large,
      ]}
    />
  );
};

export default Spinner;
