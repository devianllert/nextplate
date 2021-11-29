/* eslint-disable prefer-arrow-callback */
import * as React from 'react';
import { RiCheckLine, RiSubtractLine } from 'react-icons/ri';

import { useControllableState } from '@/common/hooks/useControllableState';

import * as S from './styled';

export interface CheckboxBaseProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'checked' | 'defaultChecked'> {
  /**
   * If `true`, the component is checked.
   *
   * If `indeterminate`, the component appears indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * However, we set a `data-indeterminate` attribute on the `input`.
   *
   * @default false
   */
  checked?: boolean | 'indeterminate';

  defaultChecked?: boolean | 'indeterminate';

  /**
   * If `true`, the component is disabled.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * The color of the component.
   *
   * @default 'primary'
   */
  color?: string;

  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<HTMLInputElement>;
}

const isIndeterminate = (checked?: boolean | 'indeterminate'): checked is 'indeterminate' => {
  return checked === 'indeterminate';
};

/**
 * The `CheckboxBase` component is used in forms when a user needs to select multiple values from several options.
 */
export const CheckboxBase = React.forwardRef(function CheckboxBase(props: CheckboxBaseProps, ref: React.ForwardedRef<HTMLDivElement>): JSX.Element {
  const {
    color = 'primary',
    disabled,
    checked: checkedProp,
    defaultChecked,
    onChange,
    required,
    className,
    inputRef,
    ...other
  } = props;

  const [checked = false, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);

    setChecked((prevChecked) => (isIndeterminate(prevChecked) ? true : !prevChecked));
  };

  return (
    <S.CheckboxBaseRoot className={className} ref={ref}>
      <S.CheckboxComponent
        type="checkbox"
        checked={isIndeterminate(checked) ? false : checked}
        defaultChecked={isIndeterminate(defaultChecked) ? false : defaultChecked}
        disabled={disabled}
        data-indeterminate={isIndeterminate(checked)}
        aria-checked={isIndeterminate(checked) ? 'mixed' : checked}
        aria-required={required}
        onChange={handleChange}
        ref={inputRef}
        {...other}
      />

      <S.CheckboxVisual color={color} aria-hidden>
        {isIndeterminate(checked) ? false : checked && <RiCheckLine />}
        {isIndeterminate(checked) && <RiSubtractLine />}
      </S.CheckboxVisual>

    </S.CheckboxBaseRoot>
  );
});
