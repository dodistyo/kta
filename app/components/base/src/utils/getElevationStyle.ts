import { css } from '@emotion/core';
import { Theme } from '../theme';
import { rgba } from 'polished';

const getElevationStyle = (t: Theme, elevation: 'none' | keyof Theme['elevation']) => {
  let elevationStyle;
  const {
    elevation: { container, raised, float, hover },
  } = t;

  switch (elevation) {
    case 'container':
      elevationStyle = css`
        box-shadow: ${container.shadowOffset.width}px ${container.shadowOffset.height}px
          ${container.shadowRadius}px ${rgba(container.shadowColor, container.shadowOpacity)};
      `;
      break;
    case 'raised':
      elevationStyle = css`
        box-shadow: ${raised.shadowOffset.width}px ${raised.shadowOffset.height}px
          ${raised.shadowRadius}px ${rgba(raised.shadowColor, raised.shadowOpacity)};
      `;
      break;
    case 'float':
      elevationStyle = css`
        box-shadow: ${float.shadowOffset.width}px ${float.shadowOffset.height}px
          ${float.shadowRadius}px ${rgba(float.shadowColor, float.shadowOpacity)};
      `;
      break;
    case 'hover':
      elevationStyle = css`
        box-shadow: ${hover.shadowOffset.width}px ${hover.shadowOffset.height}px
          ${hover.shadowRadius}px ${rgba(hover.shadowColor, hover.shadowOpacity)};
      `;
      break;
    default:
      elevationStyle = css`
        box-shadow: none;
      `;
  }

  return elevationStyle;
};

export default getElevationStyle;
