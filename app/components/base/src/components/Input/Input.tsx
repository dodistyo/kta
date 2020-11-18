/** @jsx jsx */
import React from 'react';
import { jsx, InterpolationWithTheme } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import Icon from '../Icon/Icon';
import createStyles from './Input.styles';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';

export type InputProps<T = unknown> = React.InputHTMLAttributes<HTMLInputElement> & {
  addon?: {
    content?: React.ReactNode;
    /** @default "left" */
    placement?: 'left' | 'right';
  };
  description?: React.ReactNode;
  /** @default false */
  disabled?: boolean;
  errorMessage?: React.ReactNode;
  innerRef?: React.Ref<HTMLInputElement>;
} & T;

type InputAddonProps = {
  addonContent: React.ReactNode;
  addonCss: InterpolationWithTheme<Theme>;
  addonTextCss: InterpolationWithTheme<Theme>;
};

const InputAddon: React.FC<InputAddonProps> = ({ addonContent, addonCss, addonTextCss }) => (
  <div css={addonCss}>
    <span css={addonTextCss}>{addonContent}</span>
  </div>
);

const Input = React.forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  const {
    addon: _addon,
    className,
    description,
    disabled = false,
    errorMessage,
    innerRef,
    type,
    ...rest
  } = props;
  const typePassword = type === 'password';
  const [showPassword, setShowPassword] = React.useState(false);
  const addon: InputProps['addon'] = { placement: 'left', ..._addon };
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  const toggleEye = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div ref={ref} className={className}>
      <div css={[styles.container, addon && styles.containerGroup]}>
        {addon.content && addon.placement === 'left' && (
          <InputAddon
            addonContent={addon.content}
            addonCss={styles.addonPrepend}
            addonTextCss={[
              styles.addonText,
              styles.addonTextPrepend,
              disabled && styles.addonTextDisabled,
            ]}
          />
        )}
        <div css={[styles.inputContainer, addon.content && styles.inputAddon]}>
          <input
            {...rest}
            ref={innerRef}
            disabled={disabled}
            type={showPassword ? 'text' : type}
            css={[
              styles.input,
              addon.content && addon.placement === 'left' && styles.inputAddonPrepend,
              addon.content && addon.placement === 'right' && styles.inputAddonAppend,
              errorMessage && styles.inputIsError,
            ]}
          />
          {typePassword && (
            <div css={styles.eyeIconContainer} onClick={toggleEye}>
              <Icon name={showPassword ? 'eye-slash' : 'eye'} />
            </div>
          )}
        </div>

        {addon.content && addon.placement === 'right' && (
          <InputAddon
            addonContent={addon.content}
            addonCss={styles.addonAppend}
            addonTextCss={[
              styles.addonText,
              styles.addonTextAppend,
              disabled && styles.addonTextDisabled,
            ]}
          />
        )}
      </div>
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      {description && <small css={styles.description}>{description}</small>}
    </div>
  );
});

export default Input;
