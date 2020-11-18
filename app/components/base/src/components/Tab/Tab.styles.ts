import { css } from '@emotion/core';
import { rgba } from 'polished';
import { Theme } from '../../theme';

const createStyles = (t: Theme) => {
  return {
    menuContainer: css`
      display: flex;
      margin: 0;
      padding: 0;
      width: 100%;
    `,
    menu: css`
      display: flex;
      align-items: stretch;
      position: relative;
      list-style: none;

      a {
        border-bottom: 4px solid transparent;
        color: ${t.color.darkPrimary};
        cursor: pointer;
        text-decoration: none;
        padding: ${t.spacing.s}px ${t.spacing.ml}px;
        width: 100%;

        &:hover,
        &:focus {
          color: ${t.color.darkPrimary};
          text-decoration: none;
        }

        &:focus {
          outline: 0;
        }
      }
    `,
    menuEven: css`
      text-align: center;
    `,
    menuActive: css`
      z-index: 1;

      a {
        cursor: default;
        border-bottom-color: ${t.color.yellowPrimary};
      }
    `,
    menuTitle: css`
      display: block;
      font-size: ${t.typography.size.large}px;
      font-weight: ${t.typography.weight.medium};
    `,

    bodyContainer: css`
      position: relative;
      border-top: 1px solid ${rgba(t.color.lightNeutral, 0.5)};
      margin-top: -1px;
    `,
    body: css`
      padding: ${t.spacing.ml}px;
    `,
  };
};

export default createStyles;
