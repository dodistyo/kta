import { css } from '@emotion/core';
import { Theme } from '../../theme';
import { rgba } from 'polished';

const createStyles = (t: Theme) => {
  const navbarPaddingVertical = t.spacing.s;
  const navbarLogoHeight = 46;
  const headerHeight = navbarPaddingVertical * 2 + navbarLogoHeight;
  const sidebarWidth = 208;
  const sidebarCollapsedWidth = 56;

  const headerBoxShadow = css`
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  `;
  const sidebarShadow = css`
    box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.05);
  `;
  const sidebarCollapsedBtnShadow = css`
    box-shadow: 0px 0px 4px ${rgba(t.color.darkPrimary, 0.25)};
  `;

  return {
    global: css`
      body {
        background-color: #f0f0f0;
        background-image: none;
      }
    `,

    /* ----- header ----- */
    header: css`
      position: fixed;
      top: 0;
      width: 100%;
      height: ${headerHeight - 4}px;
      background-color: ${t.color.lightPrimary};
      z-index: ${t.zIndex.header};
    `,
    headerLine: css`
      position: fixed;
      top: ${headerHeight - 4}px;
      width: 100%;
      height: 4px;
      display: flex;
      z-index: ${t.zIndex.header - 1};
      ${headerBoxShadow};
    `,
    headerLineLeft: css`
      width: 70%;
      background-color: ${t.color.yellowPrimary};
    `,
    headerLineRight: css`
      width: 30%;
      background-color: ${t.color.darkPrimary};
    `,
    navbar: css`
      position: relative;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      padding: ${navbarPaddingVertical}px ${t.spacing.m}px;
    `,
    navbarBrand: css`
      display: flex;
      align-items: center;
      font-size: ${t.typography.size.large}px;
      font-weight: ${t.typography.weight.bold};
      line-height: 1.3;
      color: ${t.color.darkPrimary};
      cursor: pointer;
      width: 100%;
      max-width: 300px;

      &:hover {
        color: ${t.color.darkPrimary};
        text-decoration: none;
      }

      img {
        display: inline-block;
        width: auto;
        height: ${navbarLogoHeight}px;
        margin-right: ${t.spacing.s}px;
      }
    `,
    navbarNav: css`
      display: flex;
      align-items: center;
      cursor: pointer;

      .svg-inline--fa {
        margin-left: ${t.spacing.xs}px;
      }
    `,
    dropdownItemHasIcon: css`
      .svg-inline--fa {
        width: 16px;
        margin-right: ${t.spacing.xs}px;
      }
    `,

    /* ----- sidebar ----- */
    sidebar: css`
      position: fixed;
      top: ${headerHeight}px;
      bottom: 0;
      left: 0;
      width: 100%;
      flex: 0 0 ${sidebarWidth}px;
      max-width: ${sidebarWidth}px;
      padding: 0;
      background-color: ${t.color.lightPrimary};
      ${sidebarShadow};
      z-index: ${t.zIndex.sidebar};
      transition: max-width ${t.animation.timing.fast}ms ${t.animation.easing.fast};
    `,
    sidebarCollapsed: css`
      max-width: ${sidebarCollapsedWidth}px;
    `,
    sidebarInner: css`
      position: relative;
      height: calc(100vh - ${headerHeight}px);
      padding-top: ${t.spacing.xs}px;
      overflow-x: hidden;
      overflow-y: auto;
    `,
    sidebarMenu: css`
      position: relative;
      display: flex;
      align-items: center;
      color: ${t.color.darkPrimary};
      padding: ${t.spacing.xs}px ${t.spacing.m}px;
      cursor: pointer;
      background-color: ${t.color.lightPrimary};
      transition: background-color ${t.animation.timing.express}ms ${t.animation.easing.express};

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 4px;
        background-color: transparent;
        transition: background-color ${t.animation.timing.express}ms ${t.animation.easing.express};
      }

      .svg-inline--fa {
        font-size: 20px;
        width: 24px;
        color: ${t.color.yellowPrimary};
        margin-right: ${t.spacing.s}px;
      }

      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: opacity ${t.animation.timing.express}ms ${t.animation.easing.express};
      }

      &:hover {
        color: ${t.color.darkPrimary};
        text-decoration: none;

        span {
          opacity: ${t.opacity.obscure};
        }
      }
    `,
    sidebarMenuActive: css`
      background-color: #f0f0f0;
      cursor: default;

      &:hover {
        span {
          opacity: 1;
        }
      }

      &::before {
        background-color: ${t.color.yellowPrimary};
      }
    `,
    sidebarCollapsedBtn: css`
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: calc(50% - 16px);
      right: -16px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: ${t.color.lightSecondary};
      background-color: ${t.color.lightPrimary};
      ${sidebarCollapsedBtnShadow};
      cursor: pointer;
      z-index: ${t.zIndex.sidebar + 10};

      &:hover {
        color: ${t.color.lightSecondary};
        text-decoration: none;
      }
    `,

    /* ----- content ----- */
    content: css`
      padding: ${t.spacing.xl}px;
      margin-top: ${headerHeight}px;
      margin-left: ${sidebarWidth}px;
      flex: 0 0 calc(100% - ${sidebarWidth}px);
      max-width: calc(100% - ${sidebarWidth}px);
      transition: margin-left ${t.animation.timing.fast}ms ${t.animation.easing.fast},
        flex ${t.animation.timing.fast}ms ${t.animation.easing.fast},
        max-width ${t.animation.timing.fast}ms ${t.animation.easing.fast};
    `,
    contentCollapsed: css`
      margin-left: ${sidebarCollapsedWidth}px;
      flex: 0 0 calc(100% - ${sidebarCollapsedWidth}px);
      max-width: calc(100% - ${sidebarCollapsedWidth}px);
    `,
  };
};

export default createStyles;
