import { css } from '@emotion/core';
import { Theme } from '../../theme';
import { darken, rgba } from 'polished';

const createStyles = (t: Theme) => {
  return {
    container: css`
      position: relative;
      height: 150px;
      width: 100%;
      cursor: pointer;
      background-color: ${t.color.lightStain};
      border-radius: 4px;
      border: 1px solid ${t.color.lightSecondary};
      transition: background-color ${t.animation.timing.fast}ms ${t.animation.easing.fast},
        border-color ${t.animation.timing.fast}ms ${t.animation.easing.fast},
        box-shadow ${t.animation.timing.fast}ms ${t.animation.easing.fast};

      &:focus {
        border-color: ${t.color.yellowSecondary};
        outline: 0;
        box-shadow: 0px 0px 0px 3px ${rgba(t.color.yellowPrimary, t.opacity.seeThrough)};
      }
    `,
    containerIsDisabled: css`
      cursor: default;
    `,
    containerIsDragOver: css`
      background-color: ${darken(0.025, t.color.lightStain)};
    `,
    containerIsError: css`
      border-color: ${t.color.redPrimary};

      &:focus {
        border-color: ${t.color.redPrimary};
        box-shadow: 0px 0px 0px 3px ${rgba(t.color.redPrimary, t.opacity.seeThrough)};
      }
    `,
    inner: css`
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      height: 100%;
      width: 100%;
    `,
    input: css`
      width: 100%;
    `,
    placeholder: css`
      display: block;
      font-size: ${t.typography.size.large}px;
      color: ${t.color.lightNeutral};
      user-select: none;
      margin-bottom: 2px;
      margin-right: ${t.spacing.ml}px;
      margin-left: ${t.spacing.ml}px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `,
    placeholderIsDisabled: css`
      opacity: ${t.opacity.translucent};
    `,
    file: css`
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
    `,
    label: css`
      display: inline-block;
      font-size: ${t.typography.size.small}px;
      line-height: 1.3;
      text-align: center;
      max-width: 70%;
      color: ${t.color.lightNeutral};
      user-select: none;

      > label {
        cursor: pointer;
        display: inline-block;
        font-weight: ${t.typography.weight.bold};
        transition: opacity ${t.animation.timing.fast}ms ${t.animation.easing.fast};
      }
    `,
    labelIsDisabled: css`
      opacity: ${t.opacity.translucent};

      > label {
        cursor: default;

        &:hover {
          opacity: 1;
        }
      }
    `,
    loaderContainer: css`
      position: absolute;
      z-index: 100;
    `,
    description: css`
      display: block;
      margin-top: ${t.spacing.xxs}px;
      font-size: ${t.typography.size.small}px;
      color: ${t.color.lightSecondary};
    `,
  };
};

export default createStyles;
