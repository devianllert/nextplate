/* eslint-disable prefer-arrow-callback */
import * as React from 'react';

import { useComposedRefs } from '@/modules/core/react/composeRefs';
import { SxProp } from '@/modules/core/css-in-js/sx';

import * as S from './styled';

export interface InputBaseProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'>, SxProp {
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error?: boolean;

  /**
   * The suffix of the input component. Will be rendered after input component
   */
  suffix?: React.ReactNode;

  /**
   * The prefix of the input component. Will be rendered before input component.
   */
  prefix?: React.ReactNode;

  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<HTMLInputElement>;

  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   *
   * @default 'input'
   */
  inputComponent?: React.ElementType;

  /**
   * If `true`, the `input` will take up the full width of its container.
   *
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * InputBase contains as few styles as possible.
 * It aims to be a simple building block for creating an input.
 */
export const InputBase = React.forwardRef(function InputBase(props: InputBaseProps, ref: React.ForwardedRef<HTMLInputElement>): JSX.Element {
  const {
    type = 'text',
    disabled,
    id,
    error,
    suffix,
    prefix,
    onClick,
    fullWidth,
    className,
    inputRef,
    inputComponent,
    ...other
  } = props;

  const inputElementRef = React.useRef<HTMLInputElement>(null);
  const composedRefs = useComposedRefs(inputRef, inputElementRef, ref);

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (inputElementRef.current && event.currentTarget === event.target) {
      inputElementRef.current.focus();
    }
  }, []);

  return (
    <S.InputBaseRoot
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={handleClick}
      className={className}
    >
      {prefix}

      <S.InputBaseComponent
        as={inputComponent}
        type={type}
        aria-invalid={error}
        disabled={disabled}
        id={id}
        ref={composedRefs}
        {...other}
      />

      {suffix}
    </S.InputBaseRoot>
  );
});
