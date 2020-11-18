import { css } from '@emotion/core';
import { Theme } from '../../theme';

const createStyles = (t: Theme) => {
  return {
    header: css`
      /* font-size: ${t.typography.size.gigantic}px; */
      color: ${t.color.lightSecondary};
    `,
    total: css`
      font-size: ${t.typography.size.gigantic}px;
      margin-bottom: 0;
    `,
    caption: css`
      color: ${t.color.lightSecondary};
      margin-bottom: 0;
    `,
    table: css`
      display: flex;
      justify-content: space-between;
      padding: ${t.spacing.xs}px;
    `,
    tableOdd: css`
      background-color: ${t.color.yellowLight};
    `,
    gender: css`
      text-align: center;
    `,
    genderTotalContainer: css`
      background-color: ${t.color.yellowLight};
      padding: ${t.spacing.xs}px;
    `,
    genderTotal: css`
      font-size: ${t.typography.size.gigantic}px;
    `,
    genderTotalCaption: css`
      color: ${t.color.lightSecondary};
      font-size: ${t.typography.size.large}px;
    `,
    genderSep: css`
      color: ${t.color.lightSecondary};
      font-weight: ${t.typography.weight.bold};
      font-size: 36px;
    `,
  };
};

export default createStyles;
