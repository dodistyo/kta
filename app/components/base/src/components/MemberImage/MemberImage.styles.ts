import { css } from '@emotion/core';
import { Theme } from '../../theme';

const createStyles = (t: Theme) => {
  return {
    container: css`
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${t.color.lightStain};
      border-radius: ${t.border.radius.default}px;
      overflow: hidden;
      margin-bottom: ${t.spacing.xs}px;

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    `,
  };
};

export default createStyles;
