/* eslint-disable prefer-arrow-callback */
import * as React from 'react';
import { Box, Divider } from '@effable/react';

import { useComposedRefs } from '@/shared/lib/react';
import { Sizes } from '@/shared/design/tokens/size';

import { useInputClear } from './useInputClear';
import { InputLabel } from './input-label';
import { InputHelperText } from './input-helper-text';
import { InputBaseProps } from '../input-base';

import * as S from './input.styled';
import { InputAdornment } from './input-adornment';

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
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   *
   * @default 'medium'
   */
  size?: Exclude<Sizes, 'xsmall'>;

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
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(props, forwardedRef): JSX.Element {
  const {
    label,
    helperText,
    fullWidth,
    error,
    disabled,
    allowClear,
    inputRef,
    suffix,
    size = 'medium',
    prefix,
    ...other
  } = props;

  const inputId = React.useId();

  const inputElementRef = React.useRef<HTMLInputElement>(null);
  const composedRefs = useComposedRefs(inputElementRef, inputRef);

  const { showClearIcon, clearIcon, composedOnChange } = useInputClear<HTMLInputElement>({
    allowClear,
    disabled,
    size,
    // @ts-expect-error conflict with types
    value: other.value,
    onChange: other.onChange,
    ref: inputElementRef,
  });

  const showSuffix = !!suffix || showClearIcon;

  const prefixElement = prefix && (
    <InputAdornment size={size} disablePointerEvents position="start">
      {prefix}
    </InputAdornment>
  );

  const suffixElement = suffix && (
    <InputAdornment size={size} position="end">
      {suffix}
    </InputAdornment>
  );

  return (
    <S.InputRoot
      fullWidth={fullWidth}
      disabled={disabled}
      error={error}
      ref={forwardedRef}
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
        size={size}
        prefix={prefixElement}
        suffix={showSuffix && (
          <>
              {clearIcon}
              {showClearIcon && !!suffix && (
                <Box my={1} alignSelf="stretch">
                  <Divider orientation="vertical" />
                </Box>
              )}
              {suffixElement}
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
