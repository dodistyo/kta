import { css } from '@emotion/core';
import { Theme } from '../../theme';

const createStyles = (t: Theme) => {
  const width = 15;
  const height = width;
  const labelFontSize = t.typography.size.small;
  const lineHeightComputed = Math.round(labelFontSize * t.typography.lineHeight);
  const top = Math.round((lineHeightComputed - height) / 2);

  return {
    container: css`
      position: relative;
      line-height: ${lineHeightComputed}px;

      input[type='checkbox'] {
        position: absolute;
        top: ${top}px;
        opacity: 0;
        padding: 0;
        width: ${width}px;
        height: ${height}px;
        z-index: 10;
        cursor: pointer;

        + label {
          position: relative;
          display: inline-block;
          cursor: pointer;
          min-height: ${height}px;
          font-weight: ${t.typography.weight.regular};
          font-size: ${labelFontSize}px;
          padding: 0 0 0 ${width + t.spacing.xs}px;
          margin-bottom: 0;

          &[data-empty='true'] {
            padding-left: ${width}px;
          }

          &::before,
          &::after {
            position: absolute;
            display: inline-block;
            content: '';
          }

          &::before {
            background: ${t.color.lightPrimary};
            border: 1px solid ${t.color.lightSecondary};
            width: ${width}px;
            height: ${height}px;
            border-radius: 3px;
            left: 0;
            top: ${top}px;
          }

          &::after {
            width: 5px;
            height: 9px;
            border-bottom: 2px solid transparent;
            border-right: 2px solid transparent;
            transform: rotate(45deg);
            left: 5px;
            top: ${2 + top}px;
          }
        }

        &:checked + label {
          &::before {
            background: ${t.color.bluePrimary};
            border-color: ${t.color.bluePrimary};
          }

          &::after {
            border-color: ${t.color.lightPrimary};
          }
        }

        &:disabled {
          cursor: not-allowed;

          + label {
            cursor: not-allowed;
            color: ${t.color.lightSecondary};

            &::before {
              border-color: ${t.color.lightSecondary};
            }
          }

          &:checked + label {
            color: ${t.color.lightSecondary};

            &::before {
              background-color: ${t.color.lightSecondary};
            }
          }
        }
      }

      + [data-component='checkbox'] {
        margin-top: ${t.spacing.xxs}px;
      }
    `,
    containerInline: css`
      display: inline-block;

      input[type='checkbox'] + label {
        margin-top: 0;
      }

      + [data-component='checkbox'] {
        margin-top: 0;
        margin-left: ${t.spacing.m}px;
      }
    `,
  };
};

export default createStyles;
