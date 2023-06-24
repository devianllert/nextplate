import React from 'react';

import { RiArrowDownSLine } from 'react-icons/ri';

import { InputProps } from '@/shared/components/system/input';

import { NativeSelectComponent, NativeSelectRoot } from './native-select.styled';

type BlacklistProps = 'allowClear' | 'suffix' | 'prefix' | 'inputComponent' | 'inputRef';

type ParentInputProps = Omit<
  InputProps,
  keyof Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> | BlacklistProps
>;

export type NativeSelectProps = ParentInputProps &
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'prefix' | 'size'>;

/**
 * The `NativeSelect` component is used for collecting user provided information from a list of options.
 */
export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>((props, forwardedRef) => {
  const { children, ...other } = props;

  return (
    <NativeSelectRoot
      inputComponent={NativeSelectComponent}
      suffix={<RiArrowDownSLine />}
      // @ts-expect-error wrong typings for inputRef
      inputRef={forwardedRef}
      {...other}
    >
      {children}
    </NativeSelectRoot>
  );
});
