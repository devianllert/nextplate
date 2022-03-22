import * as React from 'react';

import { useCallbackRef } from './useCallbackRef';

export interface UseKeyboardKeyOptions {
  event?: 'keydown' | 'keypress' | 'keyup';
}

/**
 * Hook that executes a handler when a keyboard key is used.
 */
export const useKeyboardKey = (
  key: string,
  fn?: (event: KeyboardEvent) => void,
  opts: UseKeyboardKeyOptions = {},
): void => {
  const { event = 'keydown' } = opts;

  const onKeyDown = useCallbackRef(fn);

  React.useEffect(() => {
    const handler = (handlerEvent: KeyboardEvent): void => {
      if (handlerEvent.key === key) {
        onKeyDown(handlerEvent);
      }
    };

    document.addEventListener(event, handler);

    return (): void => {
      document.addEventListener(event, handler);
    };
  }, [key, event, onKeyDown]);
};
