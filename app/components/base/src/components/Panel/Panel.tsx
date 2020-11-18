/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import createStyles from './Panel.styles';

export type PanelProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: React.ReactNode;
  /** @default "float" */
  elevation?: 'none' | keyof Theme['elevation'];
};

const Panel: React.FC<PanelProps> = props => {
  const theme = useTheme<Theme>();
  const { children, elevation = 'float', ...rest } = props;
  const styles = createStyles(theme, elevation);

  return (
    <div {...rest} css={styles.container}>
      {children}
    </div>
  );
};

export default Panel;
