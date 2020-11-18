import { css } from '@emotion/core';
import { rgba, lighten } from 'polished';
import { Theme } from '../../theme';

const createStyles = (t: Theme) => {
  return {
    wrapper: css`
      position: relative;
    `,
    container: css`
      font-size: ${t.typography.size.medium}px;
      color: ${t.color.darkPrimary};
      border: 1px solid ${rgba(t.color.lightNeutral, 0.75)};
      border-radius: ${t.border.radius.default}px;
    `,
    table: css`
      width: 100%;
      border-spacing: 0;

      th,
      td {
        border: 0;
        padding: ${t.spacing.xs}px ${t.spacing.s}px;
        white-space: normal;
        word-break: break-word;
      }

      thead {
        td,
        th {
          background: ${t.color.lightStain};
          color: ${t.color.darkPrimary};
          text-align: left;
          font-weight: ${t.typography.weight.medium};
          border-bottom: 4px solid ${t.color.yellowPrimary};
          padding-top: ${t.spacing.s}px;
          padding-bottom: ${t.spacing.s}px;

          &:first-of-type {
            border-radius: ${t.border.radius.default}px 0 0 0;
          }

          &:last-of-type {
            border-radius: 0 ${t.border.radius.default}px 0 0;
          }
        }
      }

      tbody {
        tr {
          &:nth-of-type(odd) {
            background: ${t.color.lightPrimary};
          }

          &:nth-of-type(even) {
            background: ${t.color.lightStain};
          }

          &:hover {
            background-color: ${t.color.yellowLight};
          }

          &:last-child {
            td:first-of-type {
              border-radius: 0 0 0 ${t.border.radius.default}px;
            }

            td:last-of-type {
              border-radius: 0 0 ${t.border.radius.default}px 0;
            }
          }
        }
      }
    `,
    actionRow: css`
      margin-top: -${t.spacing.xxs}px;
      margin-bottom: -${t.spacing.xxs}px;

      button {
        margin-top: ${t.spacing.xxs}px;
        margin-bottom: ${t.spacing.xxs}px;
        margin-right: ${t.spacing.xs}px;

        &:last-of-type {
          margin-right: 0;
        }
      }
    `,
    footer: css`
      border-top: 4px solid ${t.color.yellowPrimary};
      border-radius: 0 0 ${t.border.radius.default}px ${t.border.radius.default}px;
      background: ${t.color.lightStain};
      padding: ${t.spacing.s}px ${t.spacing.s}px;
    `,
    footerRow: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `,

    // TableHeaderTitle
    title: css`
      position: relative;
      display: block;
      display: flex;
      align-items: center;
    `,
    titleSort: css`
      user-select: none;
      cursor: pointer;
    `,
    titleSortIconContainer: css`
      display: inline-flex;
      flex-direction: column;
      line-height: 0;
      color: ${t.color.lightNeutral};
      margin-top: 1px;
      margin-left: ${t.spacing.xs}px;

      > span {
        display: inline-block;
        font-size: 11px;
        font-style: normal;
        line-height: 0;
        text-align: center;
        text-transform: none;

        &:last-of-type {
          margin-top: -3px;
        }

        svg {
          display: inline-block;
          line-height: 1;
        }
      }
    `,
    titleSortIconActive: css`
      color: ${lighten(0.1, t.color.darkPrimary)};
    `,

    // loading
    loadingBox: css`
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${rgba(t.color.lightPrimary, t.opacity.obscure)};
      z-index: 1;

      &.appear,
      &.enter {
        opacity: 0.01;
      }
      &.appear-active,
      &.enter-active {
        opacity: 1;
        transition: opacity ${t.animation.timing.express}ms ${t.animation.easing.express};
      }
      &.appear-done,
      &.enter-done {
        opacity: 1;
      }

      &.exit {
        opacity: 1;
      }
      &.exit-active {
        opacity: 0.01;
        transition: opacity ${t.animation.timing.express}ms ${t.animation.easing.express};
      }
      &.exit-done {
        opacity: 0.01;
      }
    `,
  };
};

export default createStyles;
