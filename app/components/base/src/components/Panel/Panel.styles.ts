import { css } from '@emotion/core';
import { Theme } from '../../theme';
import getElevationStyle from '../../utils/getElevationStyle';

const createStyles = (t: Theme, elevation: 'none' | keyof Theme['elevation']) => {
  return {
    container: css`
      position: relative;
      padding: ${t.spacing.ml}px;
      background: ${t.color.lightPrimary};
      border-radius: ${t.border.radius.default}px;
      ${getElevationStyle(t, elevation)};
    `,
  };
};

export default createStyles;
