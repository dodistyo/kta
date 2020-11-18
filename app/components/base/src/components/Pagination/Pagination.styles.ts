import { css } from '@emotion/core';
import { clearFix, darken } from 'polished';
import { Theme } from '../../theme';

const createStyles = (t: Theme) => {
  return {
    container: css`
      font-size: ${t.typography.size.medium}px;
      padding-left: 0;
      margin-bottom: 0;
      ${clearFix()};
    `,
    item: css`
      float: left;
      list-style: none;

      a,
      span {
        position: relative;
        display: block;
        padding: 3px 6px;
        margin: 0 2px;
        min-width: 28px;
        text-align: center;
        outline: 0;
        user-select: none;
        color: ${t.color.darkPrimary};
      }

      a {
        cursor: pointer;
        text-decoration: none;
        border-radius: ${t.border.radius.default}px;
        transition: color 0ms;

        &:hover,
        &:focus {
          color: ${t.color.darkPrimary};
          text-decoration: none;
        }
      }
    `,
    itemNav: css`
      a {
        min-width: unset;
      }
    `,
    itemNavDisabled: css`
      a {
        &,
        &:hover,
        &:focus {
          cursor: default;
          pointer-events: none;
          color: ${t.color.lightSecondary};
        }
      }
      i {
        border-color: ${t.color.lightSecondary};
      }
    `,
    itemBreak: css`
      span {
        min-width: unset;
        padding-left: ${t.spacing.xxs}px;
        padding-right: ${t.spacing.xxs}px;
      }
    `,
    itemActive: css`
      a {
        &,
        &:hover,
        &:focus {
          color: ${t.color.darkPrimary};
          cursor: default;
          pointer-events: none;
          background-color: ${darken(0.09, t.color.lightStain)};
        }
      }
    `,
    arrow: css`
      border: solid ${t.color.darkPrimary};
      border-width: 0 1px 1px 0;
      display: inline-block;
      width: 5px;
      height: 5px;
    `,
    arrowLeft: css`
      vertical-align: 7.5%;
      transform: rotate(135deg);
    `,
    arrowRight: css`
      vertical-align: 7.5%;
      transform: rotate(-45deg);
    `,
  };
};

export default createStyles;
