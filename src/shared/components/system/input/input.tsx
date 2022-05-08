/* eslint-disable prefer-arrow-callback */
import * as React from 'react';
import { useId } from '@radix-ui/react-id';

import { useComposedRefs } from '@/shared/lib/react';
import { Divider } from '@/shared/components/system/divider';
import { Box } from '@/shared/components/system/box';

import { useInputClear } from './useInputClear';
import { InputLabel } from './input-label';
import { InputHelperText } from './input-helper-text';
import { InputBaseProps } from '../input-base';

import * as S from './input.styled';

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
   * If `true` will show an icon button when input's value is not empty.
   * Will fire `onChange` event with empty value.
   */
  allowClear?: boolean;

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
    allowClear,
    inputRef,
    suffix,
    ...other
  } = props;

  const inputId = useId(id);

  const inputElementRef = React.useRef<HTMLInputElement>(null);
  const composedRefs = useComposedRefs(inputElementRef, inputRef);

  const { showClearIcon, clearIcon, composedOnChange } = useInputClear<HTMLInputElement>({
    allowClear,
    disabled,
    // @ts-expect-error conflict with types
    value: other.value,
    onChange: other.onChange,
    ref: inputElementRef,
  });

  const showSuffix = !!suffix || showClearIcon;

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
        id={inputId}
        disabled={disabled}
        error={error}
        fullWidth={fullWidth}
        {...other}
        inputRef={composedRefs}
        suffix={showSuffix && (
          <>
              {clearIcon}
              {showClearIcon && !!suffix && (
                <Box my={1} alignSelf="stretch">
                  <Divider orientation="vertical" />
                </Box>
              )}
              {suffix}
          </>
        )}
        onChange={composedOnChange}
      />

      {helperText && (
        <InputHelperText>{helperText}</InputHelperText>
      )}
    </S.InputRoot>
  );
});
