/**
 * @see https://github.com/text-mask/text-mask/tree/react-v5.4.3/react
 * @see https://github.com/text-mask/text-mask/blob/react-v5.4.3/componentDocumentation.md
 */
import React from 'react';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import isFunction from 'lodash/isFunction';
import Input, { InputProps as InputPropsBase } from '../Input/Input';

export type InputMaskProps = InputPropsBase<MaskedInputProps> & {
  innerRef?: React.Ref<HTMLInputElement>;
};

const InputMask: React.FC<InputMaskProps> = props => {
  const { innerRef } = props;
  const renderChild = (childRef: (inputElement: HTMLInputElement) => void, childProps: any) => {
    const ref = (node: HTMLInputElement | null) => {
      if (node) {
        childRef(node);
        if (innerRef && isFunction(innerRef)) {
          innerRef(node);
        }
      }
    };
    return <Input {...childProps} innerRef={ref} />;
  };

  return <MaskedInput {...props} render={renderChild} />;
};

export default InputMask;
