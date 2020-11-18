import { css } from '@emotion/core';
import { Theme } from '../../theme';

const createStyles = (t: Theme) => {
  return {
    base: css`
      font-size: ${t.typography.size.small}px;
      font-weight: ${t.typography.weight.medium};
      margin-bottom: ${t.spacing.xs}px;
    `,
    hint: css`
      cursor: pointer;
      color: ${t.color.lightSecondary};
      margin-left: ${t.spacing.xxs}px;
    `,
    required: css`
      color: ${t.color.redPrimary};
      margin-left: ${t.spacing.xxs}px;
    `,
  };
};

export default createStyles;
