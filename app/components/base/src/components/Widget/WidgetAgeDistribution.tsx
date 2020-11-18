/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import Panel from '../Panel/Panel';
import createStyles from './Widget.styles';
import { thousandSeparator } from '../../utils/number';

export type WidgetAgeDistributionProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children' | 'title'
> & {
  data: { [key: string]: number };
  /** @default "container" */
  elevation?: 'none' | keyof Theme['elevation'];
  /** @default "Sebaran Usia" */
  title?: string;
};

const WidgetAgeDistribution: React.FC<WidgetAgeDistributionProps> = props => {
  const theme = useTheme<Theme>();
  const { data, elevation = 'container', title = 'Sebaran Usia', ...rest } = props;
  const styles = createStyles(theme);

  return (
    <Panel {...rest} elevation={elevation}>
      <h3 css={styles.header}>{title}</h3>
      {Object.keys(data).map((key, index) => {
        const isOdd = index % 2 === 0;
        return (
          <div key={index} css={[styles.table, isOdd && styles.tableOdd]}>
            <span>{key}</span>
            <span>{thousandSeparator(data[key])}</span>
          </div>
        );
      })}
    </Panel>
  );
};

export default WidgetAgeDistribution;
