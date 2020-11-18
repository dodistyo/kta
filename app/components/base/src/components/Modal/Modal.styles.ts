import { css } from '@emotion/core';
import { Theme } from '../../theme';
import { rgba, borderRadius } from 'polished';
import isNumber from 'lodash/isNumber';
import { TransitionProps } from 'react-transition-group/Transition';

type Params = {
  theme: Theme;
  timeout?: TransitionProps['timeout'];
};

const createStyles = (params: Params) => {
  const { theme: t, timeout: _timeout = params.theme.animation.timing.normal } = params;
  const timeoutEnter = isNumber(_timeout) ? _timeout : _timeout.appear || _timeout.enter;
  const timeoutExit = isNumber(_timeout) ? _timeout : _timeout.exit;

  const {
    animation: { easing },
  } = t;

  const opacity = {
    backdrop: {
      start: 0.01,
      end: 0.5,
    },
    modal: {
      start: 0.01,
      end: 1,
    },
  };

  return {
    global: css`
      .modal-open {
        overflow: hidden;
      }
    `,
    main: css`
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        z-index: ${t.zIndex.modal};
        width: 100%;
        height: 100%;
        overflow: hidden;
        outline: 0;

        &.appear,
        &.enter {
          opacity: ${opacity.modal.start};
        }
        &.appear-active,
        &.enter-active {
          opacity: ${opacity.modal.end};
          transition: opacity ${timeoutEnter}ms ${easing.fast};
        }
        &.appear-done,
        &.enter-done {
          opacity: ${opacity.modal.end};
        }

        &.exit {
          opacity: ${opacity.modal.end};
        }
        &.exit-active {
          opacity: ${opacity.modal.start};
          transition: opacity ${timeoutExit}ms ${easing.fast};
        }
        &.exit-done {
          opacity: ${opacity.modal.start};
        }

        .modal-open & {
          overflow-x: hidden;
          overflow-y: auto;
        }
      }

      .modal-dialog {
        position: relative;
        width: auto;
        margin: ${t.spacing.ml}px;
        pointer-events: none;

        &.appear,
        &.enter {
          transform: translate(0, -50px);
        }
        &.appear-active,
        &.enter-active {
          transform: translate(0, 0);
          transition: transform ${timeoutEnter}ms ${easing.fast};
        }
        &.appear-done,
        &.enter-done {
          transform: none;
        }

        &.exit {
          transform: translate(0, 0);
        }
        &.exit-active {
          transform: translate(0, -50px);
          transition: transform ${timeoutExit}ms ${easing.fast};
        }
        &.exit-done {
          transform: none;
        }

        &.modal-dialog-transition {
          transition: transform ${t.animation.timing.express}ms ${easing.express};
        }

        &.modal-dialog-transform {
          transform: scale(1.02);
        }
      }

      .modal-dialog-scrollable {
        display: flex;
        max-height: calc(100% - ${t.spacing.ml * 2}px);

        .modal-content {
          max-height: calc(100vh - ${t.spacing.ml * 2}px);
          overflow: hidden;
        }

        .modal-header,
        .modal-footer {
          flex-shrink: 0;
        }

        .modal-body {
          overflow-y: auto;
        }
      }

      .modal-dialog-centered {
        display: flex;
        align-items: center;
        min-height: calc(100% - ${t.spacing.ml * 2}px);

        &::before {
          display: block;
          height: calc(100vh - ${t.spacing.ml * 2}px);
          content: '';
        }

        &.modal-dialog-scrollable {
          flex-direction: column;
          justify-content: center;
          height: 100%;

          &::before {
            content: none;
          }

          .modal-content {
            max-height: none;
          }
        }
      }

      .modal-content {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        pointer-events: auto;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid ${rgba(t.color.darkPrimary, 0.2)};
        border-radius: ${t.border.radius.default}px;
        outline: 0;
      }

      .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        z-index: ${t.zIndex.modalBackdrop};
        width: 100vw;
        height: 100vh;
        background-color: ${t.color.darkPrimary};

        &.appear,
        &.enter {
          opacity: ${opacity.backdrop.start};
        }
        &.appear-active,
        &.enter-active {
          opacity: ${opacity.backdrop.end};
          transition: opacity ${timeoutEnter}ms ${easing.fast};
        }
        &.appear-done,
        &.enter-done {
          opacity: ${opacity.backdrop.end};
        }

        &.exit {
          opacity: ${opacity.backdrop.end};
        }
        &.exit-active {
          opacity: ${opacity.backdrop.start};
          transition: opacity ${timeoutExit}ms ${easing.fast};
        }
        &.exit-done {
          opacity: ${opacity.backdrop.start};
        }
      }

      .modal-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: ${t.spacing.m}px;
        ${borderRadius('top', 4)};
        font-size: ${t.typography.size.large}px;
        font-weight: ${t.typography.weight.bold};

        .modal-header-btn {
          background-color: transparent;
          border: 0;
          appearance: none;
          padding: ${t.spacing.m / 2}px;
          margin: -${t.spacing.m / 2}px -${t.spacing.m / 2}px -${t.spacing.m / 2}px auto;
          color: ${t.color.lightSecondary};
          opacity: 1;
          transition: opacity ${t.animation.timing.fast}ms ${easing.fast};

          &:hover,
          &:focus {
            opacity: ${t.opacity.obscure};
          }
        }
      }

      .modal-body {
        position: relative;
        flex: 1 1 auto;
        padding: ${t.spacing.m}px;

        &.modal-body-has-header {
          padding-top: 0;
        }

        &.modal-body-has-footer {
          padding-bottom: 0;
        }
      }

      .modal-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: ${t.spacing.m}px;
        ${borderRadius('bottom', 4)};

        .modal-dialog-scrollable & {
          padding-top: ${t.spacing.m}px;
        }

        > :not(:first-of-type) {
          margin-left: ${t.spacing.xxs}px;
        }

        > :not(:last-child) {
          margin-right: ${t.spacing.xxs}px;
        }
      }

      @media (min-width: ${t.breakpoints.sm}px) {
        .modal-dialog {
          max-width: 500px;
          margin: 1.75rem auto;
        }
        .modal-dialog-scrollable {
          max-height: calc(100% - 3.5rem);
        }
        .modal-dialog-scrollable .modal-content {
          max-height: calc(100vh - 3.5rem);
        }
        .modal-dialog-centered {
          min-height: calc(100% - 3.5rem);

          &::before {
            height: calc(100vh - 3.5rem);
          }
        }
        .modal-sm {
          max-width: 300px;
        }
      }

      @media (min-width: ${t.breakpoints.lg}px) {
        .modal-lg,
        .modal-xl {
          max-width: 800px;
        }
      }

      @media (min-width: ${t.breakpoints.xl}px) {
        .modal-xl {
          max-width: 1140px;
        }
      }
    `,
  };
};

export default createStyles;
