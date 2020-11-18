import { css } from '@emotion/core';
import { Theme } from '../../theme';
import { safeCssUrl } from '../../utils';

// Images
import bgImg from '../../img/bg.png';

const createStyles = (t: Theme) => {
  return {
    global: css`
      /* ----- Ignore ----- */
      #root {
        padding: 0;
      }
      /* ----- End ignore ----- */

      html,
      body,
      #root {
        width: 100%;
        height: 100%;
      }

      body {
        background-color: #f0f0f0;
        background-image: url(${safeCssUrl(bgImg)});
        background-repeat: repeat;
        background-position: left top;
        background-attachment: fixed;
      }
    `,
    wrapper: css`
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    `,
    panel: css`
      width: 100%;
      max-width: 1000px;
      margin-right: ${t.spacing.ml}px;
      margin-left: ${t.spacing.ml}px;
      padding: 0;
      /* fix white-space: nowrap; issue for UploadBox component */
      min-width: 0;

      ${t.mq({
        marginTop: [t.spacing.ml, t.spacing.ml, t.spacing.ml, t.spacing.xxxl],
        marginBottom: [t.spacing.ml, t.spacing.ml, t.spacing.ml, t.spacing.xxxl],
      })};
    `,
    header: css`
      position: relative;
      padding: ${t.spacing.ml}px;

      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 4px;
      }

      &::before {
        width: 75%;
        background-color: ${t.color.yellowPrimary};
        z-index: 1;
      }

      &::after {
        width: 100%;
        background-color: ${t.color.darkPrimary};
        z-index: 0;
      }
    `,
    headerLeft: css`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: row;

      img {
        width: auto;
        height: 100px;
      }
    `,
    headerLeftText: css`
      margin-left: ${t.spacing.s}px;

      p {
        margin-bottom: ${t.spacing.xxs}px;
        font-weight: ${t.typography.weight.bold};
        color: ${t.color.lightSecondary};
      }

      h2 {
        margin-bottom: 0;
        font-size: ${t.typography.size.huge}px;

        ${t.mq({
          fontSize: [t.typography.size.big, t.typography.size.huge],
        })};
      }
    `,
    headerRight: css`
      display: flex;
      justify-content: center;
      flex-direction: column;

      ${t.mq({
        alignItems: ['flex-start', 'flex-start', 'flex-end'],
        height: ['auto', 'auto', '100%'],
        marginTop: [20, 20, 0],
      })};

      a {
        position: relative;
        color: ${t.color.darkPrimary};
        text-align: right;
        font-size: ${t.typography.size.large}px;
        text-decoration: none;
        cursor: pointer;

        ${t.mq({
          fontSize: [t.typography.size.medium, t.typography.size.large],
        })};

        + a {
          margin-top: ${t.spacing.xs}px;
        }

        &:hover {
          color: ${t.color.darkPrimary};
          text-decoration: none;
        }

        &::after {
          content: '';
          position: relative;
          display: block;
          width: 100%;
          border-bottom: 1px dotted ${t.color.yellowPrimary};
        }
      }
    `,
    form: css`
      padding: ${t.spacing.ml}px;
    `,
    heading: css`
      padding-top: ${t.spacing.m}px;
      color: ${t.color.lightSecondary};

      ${t.mq({
        fontSize: [t.typography.size.big, t.typography.size.huge],
      })};
    `,
    headingFirst: css`
      padding-top: 0;
    `,
    alamatTextarea: css`
      margin-bottom: ${t.spacing.xs}px;
    `,
    buttonContainer: css`
      margin-top: ${t.spacing.xl}px;
      margin-bottom: ${t.spacing.xs}px;
      text-align: center;
    `,

    /* ----- Success/failed page ----- */
    headingSuccessFailed: css`
      display: flex;
      align-items: center;

      span {
        display: inline-block;
        margin-left: ${t.spacing.xs}px;
      }
    `,
    headingSuccess: css`
      svg {
        color: ${t.color.greenPrimary};
      }
    `,
    headingFailed: css`
      svg {
        color: ${t.color.redPrimary};
      }
    `,
  };
};

export { createStyles };
