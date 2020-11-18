import { css } from '@emotion/core';
import safeCssUrl from './utils/safeCssUrl';

// Regular
import regularEot from './fonts/open-sans-v17-latin-regular.eot';
import regularTtf from './fonts/open-sans-v17-latin-regular.ttf';
import regularWoff from './fonts/open-sans-v17-latin-regular.woff';
import regularWoff2 from './fonts/open-sans-v17-latin-regular.woff2';
import regularSvg from './fonts/open-sans-v17-latin-regular.svg';

import regularItalicEot from './fonts/open-sans-v17-latin-italic.eot';
import regularItalicTtf from './fonts/open-sans-v17-latin-italic.ttf';
import regularItalicWoff from './fonts/open-sans-v17-latin-italic.woff';
import regularItalicWoff2 from './fonts/open-sans-v17-latin-italic.woff2';
import regularItalicSvg from './fonts/open-sans-v17-latin-italic.svg';

import semiBoldEot from './fonts/open-sans-v17-latin-600.eot';
import semiBoldTtf from './fonts/open-sans-v17-latin-600.ttf';
import semiBoldWoff from './fonts/open-sans-v17-latin-600.woff';
import semiBoldWoff2 from './fonts/open-sans-v17-latin-600.woff2';
import semiBoldSvg from './fonts/open-sans-v17-latin-600.svg';

import semiBoldItalicEot from './fonts/open-sans-v17-latin-600italic.eot';
import semiBoldItalicTtf from './fonts/open-sans-v17-latin-600italic.ttf';
import semiBoldItalicWoff from './fonts/open-sans-v17-latin-600italic.woff';
import semiBoldItalicWoff2 from './fonts/open-sans-v17-latin-600italic.woff2';
import semiBoldItalicSvg from './fonts/open-sans-v17-latin-600italic.svg';

import boldEot from './fonts/open-sans-v17-latin-700.eot';
import boldTtf from './fonts/open-sans-v17-latin-700.ttf';
import boldWoff from './fonts/open-sans-v17-latin-700.woff';
import boldWoff2 from './fonts/open-sans-v17-latin-700.woff2';
import boldSvg from './fonts/open-sans-v17-latin-700.svg';

import boldItalicEot from './fonts/open-sans-v17-latin-700italic.eot';
import boldItalicTtf from './fonts/open-sans-v17-latin-700italic.ttf';
import boldItalicWoff from './fonts/open-sans-v17-latin-700italic.woff';
import boldItalicWoff2 from './fonts/open-sans-v17-latin-700italic.woff2';
import boldItalicSvg from './fonts/open-sans-v17-latin-700italic.svg';

const regular = css`
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(${safeCssUrl(regularEot)});
    src: local('Open Sans Regular'), local('OpenSans-Regular'),
      url(${safeCssUrl(regularEot + '?#iefix')}) format('embedded-opentype'),
      url(${safeCssUrl(regularWoff2)}) format('woff2'),
      url(${safeCssUrl(regularWoff)}) format('woff'),
      url(${safeCssUrl(regularTtf)}) format('truetype'),
      url(${safeCssUrl(regularSvg)}) format('svg');
  }
`;

const regularItalic = css`
  @font-face {
    font-family: 'Open Sans';
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url(${safeCssUrl(regularItalicEot)});
    src: local('Open Sans Italic'), local('OpenSans-Italic'),
      url(${safeCssUrl(regularItalicEot + '?#iefix')}) format('embedded-opentype'),
      url(${safeCssUrl(regularItalicWoff2)}) format('woff2'),
      url(${safeCssUrl(regularItalicWoff)}) format('woff'),
      url(${safeCssUrl(regularItalicTtf)}) format('truetype'),
      url(${safeCssUrl(regularItalicSvg)}) format('svg');
  }
`;

const semiBold = css`
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(${safeCssUrl(semiBoldEot)});
    src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'),
      url(${safeCssUrl(semiBoldEot + '?#iefix')}) format('embedded-opentype'),
      url(${safeCssUrl(semiBoldWoff2)}) format('woff2'),
      url(${safeCssUrl(semiBoldWoff)}) format('woff'),
      url(${safeCssUrl(semiBoldTtf)}) format('truetype'),
      url(${safeCssUrl(semiBoldSvg)}) format('svg');
  }
`;

const semiBoldItalic = css`
  @font-face {
    font-family: 'Open Sans';
    font-style: italic;
    font-weight: 600;
    font-display: swap;
    src: url(${safeCssUrl(semiBoldItalicEot)});
    src: local('Open Sans SemiBold Italic'), local('OpenSans-SemiBoldItalic'),
      url(${safeCssUrl(semiBoldItalicEot + '?#iefix')}) format('embedded-opentype'),
      url(${safeCssUrl(semiBoldItalicWoff2)}) format('woff2'),
      url(${safeCssUrl(semiBoldItalicWoff)}) format('woff'),
      url(${safeCssUrl(semiBoldItalicTtf)}) format('truetype'),
      url(${safeCssUrl(semiBoldItalicSvg)}) format('svg');
  }
`;

const bold = css`
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(${safeCssUrl(boldEot)});
    src: local('Open Sans Bold'), local('OpenSans-Bold'),
      url(${safeCssUrl(boldEot + '?#iefix')}) format('embedded-opentype'),
      url(${safeCssUrl(boldWoff2)}) format('woff2'), url(${safeCssUrl(boldWoff)}) format('woff'),
      url(${safeCssUrl(boldTtf)}) format('truetype'), url(${safeCssUrl(boldSvg)}) format('svg');
  }
`;

const boldItalic = css`
  @font-face {
    font-family: 'Open Sans';
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: url(${safeCssUrl(boldItalicEot)});
    src: local('Open Sans Bold Italic'), local('OpenSans-BoldItalic'),
      url(${safeCssUrl(boldItalicEot + '?#iefix')}) format('embedded-opentype'),
      url(${safeCssUrl(boldItalicWoff2)}) format('woff2'),
      url(${safeCssUrl(boldItalicWoff)}) format('woff'),
      url(${safeCssUrl(boldItalicTtf)}) format('truetype'),
      url(${safeCssUrl(boldItalicSvg)}) format('svg');
  }
`;

const fontFace = css`
  ${regular};
  ${regularItalic};
  ${semiBold};
  ${semiBoldItalic};
  ${bold};
  ${boldItalic};
`;

export default fontFace;
