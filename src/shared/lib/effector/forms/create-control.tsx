import { combine } from 'effector';
import { useUnit } from 'effector-react/scope';
import * as React from 'react';

import { InputProps } from '@/shared/components/system/input';

import { Field } from './types';

// type ControlProps<V> = {
//   value: V;

//   onChange: (value: V) => any;

//   onBlur?: ((...args: any[]) => any) | (() => any);

//   error?: React.ReactNode;

//   hasError?: boolean;
// };

interface ControlOptions<T = any, P = any> {
  field: Field<T>;
  component: React.ComponentType<P>;
}

const createControl = <T = any, P extends InputProps = InputProps>(options: ControlOptions<T, P>) => {
  const { field: fieldStore, component: Component } = options;

  const {
    changed,
    blurred,
    reset,
    ...stores
  } = fieldStore;

  return function ControlField(props: P) {
    const field = useUnit({
      ...stores,
      changed,
      blurred,
      reset,
    });

    return (
      <Component
        {...props}
        value={field.$value}
        error={field.$isTouched && field.$hasErrors}
        // helperText={(field.$isTouched && field.$hasErrors) ? props.helperText : ''}
        // onChange={(event) => changed(event.target.value)}
        onBlur={() => blurred()}
      />
    );
  };
};
