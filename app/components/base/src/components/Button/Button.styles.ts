import { css } from '@emotion/core';
import { Theme } from '../../theme';
import { rgba } from 'polished';

const createStyles = (t: Theme) => {
  return {
    base: css`
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      padding: 6px 16px;
      margin: 0;
      border: 1px solid transparent;
      border-radius: ${t.border.radius.default}px;
      color: ${t.color.bluePrimary};
      background-color: transparent;
      user-select: none;
      outline: 0;
      min-width: 60px;
      transition: opacity ${t.animation.timing.fast}ms ${t.animation.easing.fast},
        border-color ${t.animation.timing.fast}ms ${t.animation.easing.fast},
        background-color ${t.animation.timing.fast}ms ${t.animation.easing.fast},
        box-shadow ${t.animation.timing.fast}ms ${t.animation.easing.fast};

      &:focus {
        outline: 0;
      }
    `,
    loading: css`
      &[disabled] {
        cursor: not-allowed;

        &:hover {
          opacity: 1;
        }
      }
    `,
    disabled: css`
      &[disabled] {
        opacity: ${t.opacity.translucent};
        cursor: not-allowed;

        &:hover {
          opacity: ${t.opacity.translucent};
        }
      }
    `,

    /* Variant */
    primary: css`
      background-color: ${t.color.darkPrimary};
      border-color: ${t.color.darkPrimary};
      color: #fff;

      &:hover {
        opacity: ${t.opacity.opaque};
      }

      &:active {
        opacity: 1;
        background-color: ${t.color.darkPrimary};
      }

      &:focus {
        border-color: ${t.color.darkPrimary};
        outline: 0;
        box-shadow: 0px 0px 0px 3px ${rgba(t.color.darkPrimary, t.opacity.seeThrough)};
      }
    `,
    secondary: css`
      background-color: ${t.color.yellowPrimary};
      border-color: ${t.color.yellowPrimary};
      color: ${t.color.darkPrimary};

      &:hover {
        opacity: ${t.opacity.opaque};
      }

      &:active {
        opacity: 1;
        background-color: ${t.color.yellowPrimary};
      }

      &:focus {
        border-color: ${t.color.yellowPrimary};
        outline: 0;
        box-shadow: 0px 0px 0px 3px ${rgba(t.color.yellowPrimary, t.opacity.seeThrough)};
      }
    `,
    destructive: css`
      background-color: ${t.color.redPrimary};
      border-color: ${t.color.redPrimary};
      color: ${t.color.lightPrimary};

      &:hover {
        opacity: ${t.opacity.opaque};
      }

      &:active {
        opacity: 1;
        background-color: ${t.color.redPrimary};
      }

      &:focus {
        border-color: ${t.color.redPrimary};
        outline: 0;
        box-shadow: 0px 0px 0px 3px ${rgba(t.color.redPrimary, t.opacity.seeThrough)};
      }
    `,
    success: css`
      background-color: ${t.color.greenPrimary};
      border-color: ${t.color.greenPrimary};
      color: ${t.color.lightPrimary};

      &:hover {
        opacity: ${t.opacity.opaque};
      }

      &:active {
        opacity: 1;
        background-color: ${t.color.greenPrimary};
      }

      &:focus {
        border-color: ${t.color.greenPrimary};
        outline: 0;
        box-shadow: 0px 0px 0px 3px ${rgba(t.color.greenPrimary, t.opacity.seeThrough)};
      }
    `,
    light: css`
      background-color: ${t.color.lightPrimary};
      border-color: ${t.color.lightSecondary};
      color: ${t.color.darkPrimary};

      &:hover {
        opacity: ${t.opacity.opaque};
      }

      &:active {
        opacity: 1;
        background-color: ${t.color.lightStain};
      }

      &:focus {
        border-color: ${t.color.lightSecondary};
        outline: 0;
        box-shadow: 0px 0px 0px 3px ${rgba(t.color.lightSecondary, t.opacity.seeThrough)};

        &:active {
          border-color: ${t.color.lightSecondary};
        }
      }
    `,
    textPrimary: css`
      padding: 0;
      color: ${t.color.darkPrimary};
      font-weight: ${t.typography.weight.bold};
      min-width: unset;

      &:hover {
        opacity: ${t.opacity.obscure};
      }
    `,
    textSecondary: css`
      padding: 0;
      color: ${t.color.yellowPrimary};
      font-weight: ${t.typography.weight.bold};
      min-width: unset;

      &:hover {
        opacity: ${t.opacity.obscure};
      }
    `,
    textDestructive: css`
      padding: 0;
      color: ${t.color.redPrimary};
      font-weight: ${t.typography.weight.bold};
      min-width: unset;

      &:hover {
        opacity: ${t.opacity.obscure};
      }
    `,

    /* Sizes */
    small: css`
      padding: 3px 10px;
      font-size: ${t.typography.size.small}px;
    `,
    medium: css`
      font-size: ${t.typography.size.medium}px;
    `,

    /* Spinner */
    spinner: css`
      position: absolute;
      z-index: 10;
      pointer-events: none;
    `,

    /* Icon */
    iconPrependSmall: css`
      margin-right: 6px;
    `,
    iconAppendSmall: css`
      margin-left: 6px;
    `,
    iconPrependMedium: css`
      margin-right: ${t.spacing.xs}px;
    `,
    iconAppendMedium: css`
      margin-left: ${t.spacing.xs}px;
    `,

    /* Utils */
    rounded: css`
      border-radius: 40px;
    `,
    hideVisibility: css`
      visibility: hidden;
    `,
    noPointerEvents: css`
      pointer-events: none;
    `,
  };
};

export default createStyles;
