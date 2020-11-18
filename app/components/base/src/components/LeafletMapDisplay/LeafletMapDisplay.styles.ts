import { css } from '@emotion/core';
import { Theme } from '../../theme';
import { rgba } from 'polished';

const createStyles = (t: Theme) => {
  return {
    container: css`
      position: relative;
      width: 100%;
      height: 120px;
      border-radius: ${t.border.radius.default}px;
      overflow: hidden;
      border: 1px solid ${rgba(t.color.lightNeutral, 0.75)};
    `,
  };
};

export default createStyles;
