/** @jsx jsx */
import React from 'react';
import uniqueId from 'lodash/uniqueId';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import Icon from '../Icon/Icon';
import Tooltip from '../Tooltip/Tooltip';
import createStyles from './Label.styles';

export type LabelProps = Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'children'> & {
  children: React.ReactNode;
  /**
   * Show hint of the label that will be represented by icon and tooltip.
   */
  hint?: React.ReactNode;
  /**
   * Show asterisk mark.
   */
  required?: boolean;
};

const Label: React.FC<LabelProps> = props => {
  const { children, hint, required } = props;
  const theme = useTheme<Theme>();
  const id = React.useRef<string>(uniqueId('label-'));
  const styles = createStyles(theme);

  return (
    <label css={styles.base}>
      {children}
      {required && <span css={styles.required}>*</span>}
      {!!hint && (
        <span css={styles.hint}>
          <Icon id={id.current} name="question-circle" />
          <Tooltip target={`#${id.current}`}>{hint}</Tooltip>
        </span>
      )}
    </label>
  );
};

export default Label;
