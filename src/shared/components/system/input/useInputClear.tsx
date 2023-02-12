import * as React from 'react';

import { ActionButton } from '@effable/react';
import { RiCloseLine } from 'react-icons/ri';

import { Sizes } from '@/shared/design/tokens/size';

interface UseInputClearOptions<T extends HTMLTextAreaElement | HTMLInputElement> {
  ref: React.RefObject<T>;
  allowClear?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<T>;
  size?: Exclude<Sizes, 'xsmall'>;
}

export function useInputClear<T extends HTMLTextAreaElement | HTMLInputElement>(options: UseInputClearOptions<T>) {
  const {
    allowClear, disabled, value, onChange, ref, size = 'medium',
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
    <ActionButton size={size} onMouseDown={setFocusOnInput} onClick={onClear}>
      <RiCloseLine />
    </ActionButton>
  ) : null;

  return { showClearIcon, clearIcon, composedOnChange };
}
