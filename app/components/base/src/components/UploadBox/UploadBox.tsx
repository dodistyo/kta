/** @jsx jsx */
import React from 'react';
import { jsx, css, CSSObject } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import isFunction from 'lodash/isFunction';
import Spinner from '../Spinner/Spinner';
import createStyles from './UploadBox.styles';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';

export type UploadBoxOnChangeType = 'drop' | 'input';

export type UploadBoxProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children' | 'onChange' | 'placeholder'
> & {
  description?: React.ReactNode;
  /** @default false */
  disabled?: boolean;
  errorMessage?: React.ReactNode;
  /** @default false */
  focusable?: boolean;
  height?: number;
  innerRef?: React.Ref<HTMLInputElement>;
  /** @default "Choose a file" */
  label?: string;
  /** @default "or drag it here" */
  labelCaption?: string;
  /** @default false */
  loading?: boolean;
  /** @default false */
  multiple?: boolean;
  name?: string;
  onChange?: (
    e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>,
    changeType: UploadBoxOnChangeType,
    files: FileList | null,
  ) => void;
  /** @default "Placeholder" */
  placeholder?: React.ReactNode;
  onValidate?: (files: FileList | null) => boolean | Promise<boolean>;
  width?: number;
};

const UploadBox = React.forwardRef<HTMLDivElement, UploadBoxProps>((props, ref) => {
  const {
    description,
    disabled = false,
    errorMessage,
    focusable = true,
    height,
    innerRef,
    label = 'Choose a file',
    labelCaption = 'or drag it here',
    loading = false,
    multiple = false,
    name,
    onChange,
    onValidate = () => true,
    placeholder = 'Placeholder',
    width,
    ...rest
  } = props;

  const theme = useTheme<Theme>();
  const [dragOver, setDragOver] = React.useState(false);
  const [currPlaceholder, setCurrPlaceholder] = React.useState(placeholder);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement | null>();
  const counter = React.useRef(0);

  const preventBehaviors = (
    e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dispatchChange = (
    e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>,
    key: UploadBoxOnChangeType,
    droppedFiles: FileList | null,
  ) => {
    if (!loading) {
      onChange && onChange(e, key, droppedFiles);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    preventBehaviors(e);
    counter.current++;
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    preventBehaviors(e);
    counter.current--;
    if (counter.current === 0) {
      setDragOver(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    // How to set a value to a file input in HTML?
    // you cannot, due to security reasons.
    preventBehaviors(e);
    counter.current = 0;

    const droppedFiles = e.dataTransfer.files;
    const isValid = await onValidate(droppedFiles);

    if (isValid) {
      setCurrPlaceholder(getPlaceholder(multiple ? Array.from(droppedFiles) : [droppedFiles[0]]));
      setDragOver(false);
      dispatchChange(e, 'drop', droppedFiles);
      if (containerRef.current && 'focus' in containerRef.current) {
        containerRef.current.focus();
      }
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    preventBehaviors(e);

    const droppedFiles = e.currentTarget.files;
    const isValid = await onValidate(droppedFiles);

    if (isValid) {
      if (droppedFiles) {
        if (droppedFiles.length > 0) {
          setCurrPlaceholder(getPlaceholder(Array.from(droppedFiles)));
        } else {
          setCurrPlaceholder(placeholder);
        }
      }
      dispatchChange(e, 'input', droppedFiles);
      if (containerRef.current && 'focus' in containerRef.current) {
        containerRef.current.focus();
      }
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const getPlaceholder = (fileList: Array<File>) => {
    const filenames: Array<string> = [];
    fileList.forEach(file => {
      filenames.push(file.name);
    });
    return filenames.join(', ');
  };

  const getTabIndex = () => {
    if (disabled || loading) {
      return undefined;
    }
    return focusable ? 0 : undefined;
  };

  const inlineStyles: CSSObject = {};
  if (height) {
    inlineStyles.height = height;
  }
  if (width) {
    inlineStyles.width = width;
  }
  const styles = createStyles(theme);

  return (
    <div {...rest} ref={ref}>
      <div
        ref={containerRef}
        onClick={handleClick}
        onDragOver={preventBehaviors}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        tabIndex={getTabIndex()}
        css={[
          styles.container,
          css(inlineStyles),
          (disabled || loading) && styles.containerIsDisabled,
          dragOver && styles.containerIsDragOver,
          !!errorMessage && styles.containerIsError,
        ]}
      >
        <div css={styles.inner}>
          <div css={styles.input}>
            <div css={[styles.placeholder, (disabled || loading) && styles.placeholderIsDisabled]}>
              {currPlaceholder}
            </div>
            <input
              ref={element => {
                inputRef.current = element;
                if (isFunction(innerRef)) {
                  innerRef(element);
                }
              }}
              css={styles.file}
              disabled={disabled || loading}
              multiple={multiple}
              onChange={handleInputChange}
              type="file"
              name={name}
            />
            <div css={[styles.label, (disabled || loading) && styles.labelIsDisabled]}>
              <label>{label}</label>
              &nbsp;
              <span>{labelCaption}</span>
            </div>
          </div>
          {loading && (
            <div css={styles.loaderContainer}>
              <Spinner variant="lightSecondary" />
            </div>
          )}
        </div>
      </div>
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      {description && <small css={styles.description}>{description}</small>}
    </div>
  );
});

export default UploadBox;
