/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import Spinner from '../Spinner/Spinner';
import Icon, { IconProps } from '../Icon/Icon';
import createStyles from './Button.styles';

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'disabled'
> & {
  children: React.ReactNode;
  /** @default false */
  disabled?: boolean;
  icon?: {
    name?: IconProps['name'];
    /** @default "left" */
    placement?: 'left' | 'right';
    /**
     * "fas" is for Solid, "far" is for Regular, and "fab" is for Brand.
     * @default 'fas'
     */
    prefix?: IconProps['prefix'];
  };
  /** @default false */
  loading?: boolean;
  /** @default true */
  rounded?: boolean;
  /** @default "md" */
  size?: 'sm' | 'md';
  /** @default "button" */
  type?: 'submit' | 'reset' | 'button';
  /** @default "primary" */
  variant?:
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'success'
    | 'light'
    | 'text-primary'
    | 'text-secondary'
    | 'text-destructive';
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    disabled = false,
    icon: _icon,
    loading = false,
    role,
    rounded = true,
    size = 'md',
    type = 'button',
    variant = 'primary',
    ...rest
  } = props;
  const iconDefault: ButtonProps['icon'] = { placement: 'left' };
  const icon = { ...iconDefault, ..._icon };
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const iconStyles = [loading && styles.hideVisibility, disabled && styles.noPointerEvents];

  return (
    <button
      {...rest}
      ref={ref}
      role={role || 'button'}
      disabled={disabled || loading}
      type={type}
      css={[
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'destructive' && styles.destructive,
        variant === 'success' && styles.success,
        variant === 'light' && styles.light,
        variant === 'text-primary' && styles.textPrimary,
        variant === 'text-secondary' && styles.textSecondary,
        variant === 'text-destructive' && styles.textDestructive,
        size === 'sm' && styles.small,
        size === 'md' && styles.medium,
        rounded && styles.rounded,
        loading && styles.loading,
        disabled && styles.disabled,
      ]}
    >
      {loading && (
        <Spinner css={styles.spinner} variant="light" size={size === 'sm' ? 'sm' : 'md'} />
      )}
      {icon.name && icon.placement === 'left' && (
        <Icon
          name={icon.name}
          prefix={icon.prefix}
          css={[
            ...iconStyles,
            size === 'sm' && styles.iconPrependSmall,
            size === 'md' && styles.iconPrependMedium,
          ]}
        />
      )}
      <span css={[loading && styles.hideVisibility, disabled && styles.noPointerEvents]}>
        {children}
      </span>
      {icon.name && icon.placement === 'right' && (
        <Icon
          name={icon.name}
          prefix={icon.prefix}
          css={[
            ...iconStyles,
            size === 'sm' && styles.iconAppendSmall,
            size === 'md' && styles.iconAppendMedium,
          ]}
        />
      )}
    </button>
  );
});

export default Button;
