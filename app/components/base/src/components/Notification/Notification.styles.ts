import { css } from '@emotion/core';
import { Theme } from '../../theme';
import getElevationStyle from '../../utils/getElevationStyle';

const createStyles = (t: Theme) => {
  const transition = css`
    transition: opacity ${t.animation.timing.normal}ms ${t.animation.easing.normal},
      transform ${t.animation.timing.normal}ms ${t.animation.easing.normal};
  `;

  return {
    main: css`
      position: fixed;
      top: 1rem;
      left: 50%;
      margin-top: 15px;
      padding: 0 ${t.grid.gutter}px;
      display: flex;
      align-items: center;
      height: 50px;
      line-height: 1;
      border-radius: ${t.border.radius.default}px;
      font-size: ${t.typography.size.medium}px;
      background-color: ${t.color.lightPrimary};
      color: ${t.color.darkPrimary};
      cursor: pointer;
      z-index: ${t.zIndex.notification};

      &:focus {
        outline: none;
      }

      &.enter {
        opacity: 0.01;
        transform: translate3d(-50%, -49px, 0);
      }

      &.enter-active {
        opacity: 1;
        transform: translate3d(-50%, 0, 0);
        ${transition};
      }

      &.enter-done {
        opacity: 1;
        transform: translate3d(-50%, 0, 0);
        ${transition};
      }

      &.exit {
        transform: translate3d(-50%, 0, 0);
        ${transition};
      }

      &.exit-active {
        opacity: 0.01;
        ${transition};
      }

      &.exit-done {
        opacity: 0.01;
        transform: translate3d(-50%, 0, 0);
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

    sizeSmall: css`
      width: ${t.grid.container.sm}px;
    `,
    sizeMedium: css`
      width: ${t.grid.container.md}px;
    `,
    sizeLarge: css`
      width: ${t.grid.container.lg}px;
    `,

    message: css`
      display: flex;
      align-items: center;
    `,

    icon: css`
      font-size: ${t.typography.size.large}px;
      margin-right: ${t.spacing.xs}px;
    `,
    iconSuccess: css`
      color: ${t.color.greenPrimary};
    `,
    iconInfo: css`
      color: ${t.color.bluePrimary};
    `,
    iconError: css`
      color: ${t.color.redPrimary};
    `,
  };
};

export default createStyles;
