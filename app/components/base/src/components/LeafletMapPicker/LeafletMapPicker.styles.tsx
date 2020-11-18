import { css, keyframes } from '@emotion/core';
import { Theme } from '../../theme';
import { rgba } from 'polished';

const createStyles = (t: Theme) => {
  const blur = keyframes`
  to { filter: blur(0px);}
  `;

  return {
    container: css`
      position: relative;
      width: 100%;
    `,
    containerInner: css`
      position: relative;
      width: 100%;
      height: 91px;
      border-radius: ${t.border.radius.default}px;
      overflow: hidden;
      border: 1px solid ${t.color.lightSecondary};
    `,
    mask: css`
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    maskBtn: css`
      color: ${t.color.lightPrimary};
      background-color: ${rgba(t.color.darkPrimary, t.opacity.obscure)};
      padding: 8px 16px;
      border-radius: ${t.border.radius.default}px;
      cursor: pointer;
      user-select: none;

      span {
        display: inline-block;
        margin-right: ${t.spacing.xxs}px;
      }
    `,
    mapContainer: css`
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 0;
      filter: blur(2px);
    `,
    mapContainerClicked: css`
      animation: ${blur} ${t.animation.timing.normal}ms forwards;
    `,
    address: css`
      font-size: ${t.typography.size.small}px;
      margin-top: ${t.spacing.xxs}px;
    `,
  };
};

export default createStyles;
