/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';
import createStyles from '../Input/Input.styles';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  description?: React.ReactNode;
  /** @default false */
  disabled?: boolean;
  errorMessage?: React.ReactNode;
  innerRef?: React.Ref<HTMLTextAreaElement>;
  /** @default 3 */
  rows?: number;
};

const Textarea = React.forwardRef<HTMLDivElement, TextareaProps>((props, ref) => {
  const {
    className,
    description,
    disabled = false,
    errorMessage,
    innerRef,
    rows = 3,
    ...rest
  } = props;
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <div ref={ref} className={className}>
      <textarea
        {...rest}
        ref={innerRef}
        rows={rows}
        disabled={disabled}
        css={[styles.input, styles.textarea, errorMessage && styles.inputIsError]}
      />
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      {description && <small css={styles.description}>{description}</small>}
    </div>
  );
});

export default Textarea;
