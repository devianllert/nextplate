import * as React from 'react';

import { ActionButton } from '@effable/react';
import { RiCloseLine } from 'react-icons/ri';

interface UseInputClearOptions<T extends HTMLTextAreaElement | HTMLInputElement> {
  ref: React.RefObject<T>;
  allowClear?: boolean;
  label: string;
  disabled?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<T>;
  size?: 'large' | 'medium' | 'small';
}

export function useInputClear<T extends HTMLTextAreaElement | HTMLInputElement>(options: UseInputClearOptions<T>) {
  const {
    allowClear, disabled, value, onChange, ref, size = 'medium', label,
  } = options;

  const [hasUncontrolledInputValue, setHasUncontrolledInputValue] = React.useState(false);

  const isControlledMode = typeof value !== 'undefined';

  const composedOnChange = (event: React.ChangeEvent<T>) => {
    if (allowClear && !isControlledMode) {
      setHasUncontrolledInputValue(Boolean(event.target.value));
    }

    onChange?.(event);
  };

  const showClearIcon = allowClear && !disabled && (value || hasUncontrolledInputValue);

  const setFocusOnInput = (event: React.MouseEvent): void => {
    event.preventDefault();
    ref.current?.focus();
  };

  const onClear = (originEvent: React.MouseEvent<HTMLButtonElement>): void => {
    if (onChange) {
      const event = Object.create(originEvent) as React.ChangeEvent<T>;

      event.target.value = '';
      onChange(event);
    }

    if (!isControlledMode && ref.current) {
      // eslint-disable-next-line no-param-reassign
      ref.current.value = '';
      setHasUncontrolledInputValue(false);
    }
  };

  const clearIcon = showClearIcon ? (
    <ActionButton size={size} onMouseDown={setFocusOnInput} onClick={onClear} label={label}>
      <RiCloseLine />
    </ActionButton>
  ) : null;

  return { showClearIcon, clearIcon, composedOnChange };
}
