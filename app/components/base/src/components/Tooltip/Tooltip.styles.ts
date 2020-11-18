import { css } from '@emotion/core';
import { Theme } from '../../theme';

const createStyles = (t: Theme) => {
  const arrowSize = 5;
  const additionalPadding = arrowSize * 2; // additionalPadding must be greater than `arrowSize`
  const {
    animation: { easing, timing },
  } = t;

  return {
    base: css`
      font-size: ${t.typography.size.small}px;
      max-width: 260px;
      z-index: ${t.zIndex.tooltip};

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

      &[data-placement^='top'] {
        padding-bottom: ${additionalPadding}px;
      }
      &[data-placement^='right'] {
        padding-left: ${additionalPadding}px;
      }
      &[data-placement^='bottom'] {
        padding-top: ${additionalPadding}px;
      }
      &[data-placement^='left'] {
        padding-right: ${additionalPadding}px;
      }

      /* ---------------------------------------- */
      /* Arrow */
      /* ---------------------------------------- */
      .tooltip-arrow {
        width: 0;
        height: 0;

        &::after {
          position: absolute;
          display: block;
          content: '';
          border-color: transparent;
          border-style: solid;
        }
      }

      &[data-placement^='top'] {
        .tooltip-arrow {
          bottom: 0;

          &::after {
            bottom: ${additionalPadding - arrowSize}px;
            left: -${arrowSize}px;
            border-width: ${arrowSize}px ${arrowSize}px 0 ${arrowSize}px;
            border-top-color: ${t.color.darkPrimary};
          }
        }
      }

      &[data-placement^='right'] {
        .tooltip-arrow {
          left: 0;
          &::after {
            left: ${additionalPadding - arrowSize}px;
            top: -${arrowSize}px;
            border-width: ${arrowSize}px ${arrowSize}px ${arrowSize}px 0;
            border-right-color: ${t.color.darkPrimary};
          }
        }
      }

      &[data-placement^='bottom'] {
        .tooltip-arrow {
          top: 0;
          &::after {
            top: ${additionalPadding - arrowSize}px;
            left: -${arrowSize}px;
            border-width: 0 ${arrowSize}px ${arrowSize}px ${arrowSize}px;
            border-bottom-color: ${t.color.darkPrimary};
          }
        }
      }

      &[data-placement^='left'] {
        .tooltip-arrow {
          right: 0;
          &::after {
            right: ${additionalPadding - arrowSize}px;
            top: -${arrowSize}px;
            border-width: ${arrowSize}px 0 ${arrowSize}px ${arrowSize}px;
            border-left-color: ${t.color.darkPrimary};
          }
        }
      }

      &[data-placement='top-start'],
      &[data-placement='bottom-start'] {
        .tooltip-arrow[data-edge]::after {
          left: -${arrowSize * 4}px;
        }
      }

      &[data-placement='top-end'],
      &[data-placement='bottom-end'] {
        .tooltip-arrow[data-edge]::after {
          left: ${arrowSize * 2}px;
        }
      }

      &[data-placement='right-start'],
      &[data-placement='left-start'] {
        .tooltip-arrow[data-edge]::after {
          top: -${arrowSize * 3}px;
        }
      }

      &[data-placement='right-end'],
      &[data-placement='left-end'] {
        .tooltip-arrow[data-edge]::after {
          top: ${arrowSize}px;
        }
      }
    `,
    inner: css`
      padding: ${t.spacing.xxs}px ${t.spacing.xs}px;
      border-radius: ${t.border.radius.default}px;
      background-color: ${t.color.darkPrimary};
      color: ${t.color.lightPrimary};
    `,
  };
};

export default createStyles;
