import { css, keyframes } from '@emotion/core';
import { Theme } from '../../theme';

const createStyles = (t: Theme) => {
  const smallWidth = 12;
  const smallHeight = smallWidth;
  const mediumWidth = 16;
  const mediumHeight = mediumWidth;
  const largeWidth = 20;
  const largeHeight = largeWidth;

  const colorMixin = (color: string) => css`
    &::before {
      border-top-color: ${color};
      border-right-color: ${color};
    }
  `;

  const sizeMixin = (width: number, height: number) => css`
    width: ${width}px;
    height: ${height}px;

    &::before {
      width: ${width}px;
      height: ${height}px;
      margin-top: -${width / 2}px;
      margin-left: -${height / 2}px;
    }
  `;

  const circular = keyframes`
  to {
    transform: rotate(360deg);
  }
  `;

  return {
    base: css`
      position: relative;

      &::before {
        position: absolute;
        content: '';
        box-sizing: border-box;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        border: ${t.border.width.bold}px solid transparent;
        animation: ${circular} ${t.animation.timing.slow}ms linear infinite;
      }
    `,

    /* Variant */
    light: css`
      ${colorMixin(t.color.lightPrimary)};
    `,
    lightSecondary: css`
      ${colorMixin(t.color.lightSecondary)};
    `,
    primary: css`
      ${colorMixin(t.color.darkPrimary)};
    `,
    secondary: css`
      ${colorMixin(t.color.yellowPrimary)};
    `,
    destructive: css`
      ${colorMixin(t.color.redPrimary)};
    `,

    /* Size */
    small: css`
      ${sizeMixin(smallWidth, smallHeight)};
    `,
    medium: css`
      ${sizeMixin(mediumWidth, mediumHeight)};
    `,
    large: css`
      ${sizeMixin(largeWidth, largeHeight)};
    `,
  };
};

export default createStyles;
