/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import Panel from '../Panel/Panel';
import createStyles from './Widget.styles';
import { thousandSeparator } from '../../utils/number';

export type WidgetTotalDataProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** @default "container" */
  elevation?: 'none' | keyof Theme['elevation'];
  /** @default "Total Data" */
  title?: React.ReactNode;
  total: number;
};

const WidgetTotalData: React.FC<WidgetTotalDataProps> = props => {
  const theme = useTheme<Theme>();
  const { elevation = 'container', title = 'Total Data', total, ...rest } = props;
  const styles = createStyles(theme);

  return (
    <Panel {...rest} elevation={elevation}>
      <h3 css={styles.header}>{title}</h3>
      <p css={styles.total}>{thousandSeparator(total)} KTA</p>
      <p css={styles.caption}>se-Indonesia</p>
    </Panel>
  );
};

export default WidgetTotalData;
