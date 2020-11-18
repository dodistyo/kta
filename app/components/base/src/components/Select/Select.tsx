/** @jsx jsx */
// If you need custom component
// https://stackoverflow.com/a/54598963
// https://stackoverflow.com/a/58527455
import React from 'react';
import ReactSelect, { OptionsType, OptionTypeBase } from 'react-select';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';
import { Props } from './SelectProps';
import { createStyles, createSelectStyles } from './Select.styles';

export type SelectOptionTypeBase = OptionTypeBase;

export type SelectProps<T extends OptionTypeBase> = Omit<
  Props<T>,
  | 'isClearable'
  | 'isDisabled'
  | 'isLoading'
  | 'isOptionDisabled'
  | 'isOptionSelected'
  | 'isMulti'
  | 'isRtl'
  | 'isSearchable'
> & {
  clearable?: boolean;
  description?: React.ReactNode;
  disabled?: boolean;
  errorMessage?: React.ReactNode;
  innerRef?: React.Ref<ReactSelect<T>>;
  loading?: boolean;
  /** @default "raised" */
  menuElevation?: 'none' | keyof Theme['elevation'];
  multi?: boolean;
  optionDisabled?: (option: T, options: OptionsType<T>) => boolean | false;
  optionSelected?: (option: T, options: OptionsType<T>) => boolean;
  rtl?: boolean;
  searchable?: boolean;
};

// Generics while using React.forwardRef
// https://stackoverflow.com/a/58473012
const SelectBase = <T extends OptionTypeBase>(
  props: SelectProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    clearable,
    description,
    disabled,
    errorMessage,
    innerRef,
    loading,
    optionDisabled,
    optionSelected,
    menuElevation = 'raised',
    maxMenuHeight = 206, // 33 * 6 + 8
    noOptionsMessage = () => 'Tidak ada opsi',
    multi,
    rtl,
    searchable,
    ...rest
  } = props;
  const theme = useTheme<Theme>();

  const styles = createStyles(theme);
  const selectStyles = createSelectStyles(theme, !!errorMessage, menuElevation);

  return (
    <div ref={ref}>
      <ReactSelect
        {...rest}
        ref={innerRef}
        isClearable={clearable}
        isDisabled={disabled}
        isLoading={loading}
        isMulti={multi}
        isOptionDisabled={optionDisabled}
        isOptionSelected={optionSelected}
        isRtl={rtl}
        isSearchable={searchable}
        maxMenuHeight={maxMenuHeight}
        noOptionsMessage={noOptionsMessage}
        styles={selectStyles}
      />
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      {description && <small css={styles.description}>{description}</small>}
    </div>
  );
};

const Select = React.forwardRef(SelectBase) as <T extends OptionTypeBase>(
  p: SelectProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;

export default Select;
