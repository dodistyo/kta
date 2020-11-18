import { css } from '@emotion/core';
import { rgba, darken } from 'polished';
import { Theme } from '../../theme';
import getElevationStyle from '../../utils/getElevationStyle';

const createStyles = (t: Theme) => {
  const arrowSize = 7;
  const additionalPadding = 12; // additionalPadding must be greater than `arrowSize`
  const {
    animation: { easing, timing },
  } = t;

  return {
    menu: css`
      z-index: ${t.zIndex.dropdownMenu};

      &,
      &:focus {
        outline: 0;
      }

      &[data-placement^='top'] {
        padding-bottom: ${additionalPadding}px;
      }
      &[data-placement^='bottom'] {
        padding-top: ${additionalPadding}px;
      }

      /* ---------------------------------------- */
      /* Animation */
      /* ---------------------------------------- */

      &.appear,
      &.enter {
        opacity: 0.01;
      }
      &.appear-active,
      &.enter-active {
        opacity: 1;
        transition: opacity ${timing.fast}ms ${easing.fast};
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
        transition: opacity ${timing.fast}ms ${easing.fast};
      }
      &.exit-done {
        opacity: 0.01;
      }

      /* ---------------------------------------- */
      /* Arrow */
      /* ---------------------------------------- */
      .dropdown-arrow {
        width: 0;
        height: 0;

        &::before,
        &::after {
          position: absolute;
          display: block;
          content: '';
          border-color: transparent;
          border-style: solid;
        }
      }

      &[data-placement^='top'] {
        .dropdown-arrow {
          bottom: 0;

          &::before {
            bottom: ${additionalPadding - arrowSize}px;
            left: -${arrowSize + 1}px;
            border-width: ${arrowSize + 1}px ${arrowSize + 1}px 0 ${arrowSize + 1}px;
            border-top-color: ${t.color.lightNeutral};
          }

          &::after {
            bottom: ${additionalPadding - arrowSize + 1}px;
            left: -${arrowSize}px;
            border-width: ${arrowSize}px ${arrowSize}px 0 ${arrowSize}px;
            border-top-color: ${t.color.lightPrimary};
          }
        }
      }

      &[data-placement^='bottom'] {
        .dropdown-arrow {
          top: 0;

          &::before {
            top: ${additionalPadding - arrowSize}px;
            left: -${arrowSize + 1}px;
            border-width: 0 ${arrowSize + 1}px ${arrowSize + 1}px ${arrowSize + 1}px;
            border-bottom-color: ${t.color.lightNeutral};
          }

          &::after {
            top: ${additionalPadding - arrowSize + 1}px;
            left: -${arrowSize}px;
            border-width: 0 ${arrowSize}px ${arrowSize}px ${arrowSize}px;
            border-bottom-color: ${t.color.lightPrimary};
          }
        }
      }
    `,
    menuInner: css`
      padding: ${t.spacing.xs}px 0;
      border-radius: ${t.border.radius.default}px;
      border: 1px solid ${rgba(t.color.lightNeutral, 0.75)};
      background-color: ${t.color.lightPrimary};
      min-width: 160px;
      max-width: 300px;
    `,
    menuItem: css`
      display: block;
      width: 100%;
      padding: ${t.spacing.xxs}px ${t.spacing.m}px;
      clear: both;
      font-weight: ${t.typography.weight.regular};
      color: ${t.color.darkPrimary};
      text-align: inherit;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background-color: transparent;
      border: 0;
      cursor: pointer;
      transition: background-color ${t.animation.timing.express}ms ${t.animation.easing.express};

      &:hover:not([disabled]) {
        background-color: ${darken(0.01, t.color.lightStain)};
        text-decoration: none;
      }

      &,
      &:focus {
        outline: 0;
      }

      &[disabled],
      &.disabled {
        cursor: not-allowed;
        opacity: ${t.opacity.washedOut};
      }
    `,

    elevationContainer: css`
      ${getElevationStyle(t, 'container')};
    `,
    elevationRaised: css`
      ${getElevationStyle(t, 'raised')};
    `,
    elevationFloat: css`
      ${getElevationStyle(t, 'float')};
    `,
    elevationHover: css`
      ${getElevationStyle(t, 'hover')};
    `,
  };
};

export default createStyles;
