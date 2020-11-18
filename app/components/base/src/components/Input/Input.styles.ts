import { css } from '@emotion/core';
import { rgba, borderRadius } from 'polished';
import { Theme } from '../../theme';

const createStyles = (t: Theme) => {
  return {
    container: css`
      position: relative;
    `,
    containerGroup: css`
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      width: 100%;
    `,

    inputContainer: css`
      position: relative;
      width: 100%;
    `,
    input: css`
      display: block;
      width: 100%;
      padding: 6px 12px;
      font-family: inherit;
      font-size: inherit;
      font-weight: ${t.typography.weight.regular};
      line-height: inherit;
      color: ${t.color.darkPrimary};
      background-color: ${t.color.lightPrimary};
      background-clip: padding-box;
      border: 1px solid ${t.color.lightSecondary};
      border-radius: ${t.border.radius.default}px;
      transition: border-color ${t.animation.timing.fast}ms ${t.animation.easing.fast},
        box-shadow ${t.animation.timing.fast}ms ${t.animation.easing.fast},
        background-color ${t.animation.timing.fast}ms ${t.animation.easing.fast};
      /* Fix appearance for date inputs in Safari */
      appearance: none;

      &:focus {
        border-color: ${t.color.yellowSecondary};
        outline: 0;
        box-shadow: 0px 0px 0px 3px ${rgba(t.color.yellowPrimary, t.opacity.seeThrough)};
      }

      &::placeholder {
        color: ${t.color.lightSecondary};
      }

      &:disabled {
        color: #999999;
        border-color: #e4e4e4;
        background-color: #f2f2f2;
      }
    `,
    inputIsError: css`
      border-color: ${t.color.redPrimary};

      &:focus {
        border-color: ${t.color.redPrimary};
        box-shadow: 0px 0px 0px 3px ${rgba(t.color.redPrimary, t.opacity.seeThrough)};
      }
    `,
    inputAddon: css`
      position: relative;
      flex: 1 1 0%;
      min-width: 0;
      margin-bottom: 0;
    `,
    inputAddonPrepend: css`
      ${borderRadius('left', 0)};
    `,
    inputAddonAppend: css`
      ${borderRadius('right', 0)};
    `,
    textarea: css`
      min-height: 35px;
    `,

    addonPrepend: css`
      margin-right: -1px;
    `,
    addonAppend: css`
      margin-left: -1px;
    `,
    addonText: css`
      display: flex;
      align-items: center;
      padding: 6px 12px;
      margin-bottom: 0;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      color: ${t.color.lightSecondary};
      text-align: center;
      white-space: nowrap;
      background-color: ${t.color.lightStain};
      border: 1px solid ${t.color.lightSecondary};
      border-radius: ${t.border.radius.default}px;

      /* for fontawesome icon */
      svg.svg-inline--fa {
        min-height: ${t.typography.size.medium * t.typography.lineHeight}px;
      }
    `,
    addonTextDisabled: css`
      color: #999999;
      border-color: #e4e4e4;
      background-color: #f2f2f2;
    `,
    addonTextPrepend: css`
      ${borderRadius('right', 0)};
    `,
    addonTextAppend: css`
      ${borderRadius('left', 0)};
    `,

    eyeIconContainer: css`
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px 12px;
      min-width: 44px;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      color: ${t.color.darkPrimary};
      border: 1px solid transparent;
      cursor: pointer;
      user-select: none;

      /* for fontawesome icon */
      svg.svg-inline--fa {
        min-height: ${t.typography.size.medium * t.typography.lineHeight}px;
      }
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
