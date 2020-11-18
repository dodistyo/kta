/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import uniqueId from 'lodash/uniqueId';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import createStyles from './Checkbox.styles';

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
  /** @default false */
  inline?: boolean;
  innerRef?: React.Ref<HTMLInputElement>;
  instanceId?: string;
};

const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>((props, ref) => {
  const { className, label, inline = false, innerRef, instanceId, ...rest } = props;
  const id = React.useRef(uniqueId('checkbox-'));
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <div
      ref={ref}
      data-component="checkbox"
      className={className}
      css={[styles.container, inline && styles.containerInline]}
    >
      <input {...rest} ref={innerRef} id={instanceId || id.current} type="checkbox" />
      <label htmlFor={instanceId || id.current} data-empty={!label}>
        {label}
      </label>
    </div>
  );
});

export default Checkbox;
