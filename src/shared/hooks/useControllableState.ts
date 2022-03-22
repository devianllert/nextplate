import * as React from 'react';
import { useCallbackRef } from './useCallbackRef';

const useUncontrolledState = <T>(props: Omit<UseControllableStateParams<T>, 'prop'>) => {
  const {
    defaultProp,
    onChange,
  } = props;

  const uncontrolledState = React.useState<T | undefined>(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = React.useRef(value);
  const handleChange = useCallbackRef(onChange);

  React.useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value as T);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, handleChange]);

  return uncontrolledState;
};

type UseControllableStateParams<T> = {
  prop?: T | undefined;
  defaultProp?: T | undefined;
  onChange?: (event: any) => void;
};

type SetStateFn<T> = (prevState?: T) => T;

export const useControllableState = <T>(props: UseControllableStateParams<T>): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] => {
  const {
    prop,
    defaultProp,
    onChange = () => {},
  } = props;

  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange });
  const handleChange = useCallbackRef(onChange);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;

  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> = React.useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue as SetStateFn<T>;
        const newValue = typeof nextValue === 'function' ? setter(prop) : nextValue;
        if (newValue !== prop) handleChange(newValue as T);
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, handleChange],
  );

  return [value, setValue];
};
