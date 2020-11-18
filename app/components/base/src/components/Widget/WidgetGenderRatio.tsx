/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import Panel from '../Panel/Panel';
import createStyles from './Widget.styles';
import { thousandSeparator } from '../../utils/number';

export type WidgetGenderRatioProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children' | 'title'
> & {
  data: { [key: string]: number };
  /** @default "container" */
  elevation?: 'none' | keyof Theme['elevation'];
  /** @default "Laki-laki : Perempuan" */
  title?: string;
};

const WidgetGenderRatio: React.FC<WidgetGenderRatioProps> = props => {
  const theme = useTheme<Theme>();
  const { data, elevation = 'container', title = 'Laki-laki : Perempuan', ...rest } = props;
  const styles = createStyles(theme);

  return (
    <Panel {...rest} elevation={elevation}>
      <h3 css={styles.header}>{title}</h3>
      <div css={styles.gender}>
        {Object.keys(data).map((gender, index) => {
          const isEven = index % 2 === 1;
          return (
            <Fragment key={index}>
              {isEven && <div css={styles.genderSep}>:</div>}
              <div css={styles.genderTotalContainer}>
                <div css={styles.genderTotal}>{thousandSeparator(data[gender])}</div>
                <div css={styles.genderTotalCaption}>{gender}</div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </Panel>
  );
};

export default WidgetGenderRatio;
