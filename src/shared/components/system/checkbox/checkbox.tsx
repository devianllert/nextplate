/* eslint-disable prefer-arrow-callback */
import * as React from 'react';

import * as Text from '@/shared/components/system/text';

import { CheckboxBase, CheckboxBaseProps } from '../checkbox-base';

import * as S from './checkbox.styled';

export interface CheckboxProps extends CheckboxBaseProps {
  /**
   * The label of the checkbox
   */
  label?: React.ReactNode;
}

/**
 * The `Checkbox` component is used in forms when a user needs to select multiple values from several options.
 */
export const Checkbox = React.forwardRef(function Checkbox(props: CheckboxProps, ref: React.ForwardedRef<HTMLLabelElement>): JSX.Element {
  const {
    label,
    checked,
    disabled = false,
    color = 'primary',
    inputRef,
    ...other
  } = props;

  return (
    <S.CheckboxRoot disabled={disabled} ref={ref} $size={props.size}>
      <CheckboxBase checked={checked} disabled={disabled} color={color} inputRef={inputRef} {...other} />

      {label && (
        <Text.Paragraph
          fontSize="inherit"
          color={disabled ? 'text.disabled' : 'text.primary'}
          sx={{
            ml: 2,
          }}
        >
          {label}
        </Text.Paragraph>
      )}
    </S.CheckboxRoot>
  );
});
