/* eslint-disable prefer-arrow-callback */
import * as React from 'react';
import { useId } from '@radix-ui/react-id';

import { InputBaseProps } from '../InputBase';
import { InputLabel } from './InputLabel';
import { InputHelperText } from './InputHelperText';

import * as S from './styled';

export interface InputProps extends InputBaseProps {
  /**
   * The label of the input.
   */
  label?: string;

  /**
   * The helper text of the input.
   */
  helperText?: string;

  /**
   * If `true`, the component is disabled.
   *
   * @default false
   */
  disabled?: boolean;
}

/**
 * The `Input` component is used to get user input in a text field.
 */
export const Input = React.forwardRef(function Input(props: InputProps, ref: React.ForwardedRef<HTMLInputElement>): JSX.Element {
  const {
    label,
    helperText,
    fullWidth,
    id,
    error,
    disabled,
    inputRef,
    ...other
  } = props;

  const inputId = useId(id);

  return (
    <S.InputRoot
      fullWidth={fullWidth}
      disabled={disabled}
      error={error}
      ref={ref}
    >
      {label && (
        <InputLabel htmlFor={inputId} title={label}>{label}</InputLabel>
      )}

      <S.InputComponent
        ref={inputRef}
        id={inputId}
        disabled={disabled}
        error={error}
        fullWidth={fullWidth}
        {...other}
      />

      {helperText && (
        <InputHelperText>{helperText}</InputHelperText>
      )}
    </S.InputRoot>
  );
});
