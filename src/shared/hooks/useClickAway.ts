import * as React from 'react';

import { useCallbackRef } from './useCallbackRef';

/**
 * Hook that triggers a callback when the user clicks outside the target element.
 */
export const useClickAway = (
  ref: React.RefObject<HTMLElement | null>,
  handler?: (event: PointerEvent) => void,
): void => {
  const onClickOutside = useCallbackRef(handler);

  React.useEffect(
    (): (() => void) => {
      const listener = (event: PointerEvent): void => {
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }

        onClickOutside(event);
      };

      /**
       * if this hook executes in a component that mounts via a `pointerdown` event, the event
       * would bubble up to the document and trigger a `pointerdown` event. We avoid
       * this by delaying the event listener registration on the document.
       * This is not React specific, but rather how the DOM works, ie:
       * ```
       * button.addEventListener('pointerdown', () => {
       *   console.log('I will log');
       *   document.addEventListener('pointerdown', () => {
       *     console.log('I will also log');
       *   })
       * });
       */
      const timerId = window.setTimeout(() => {
        document.addEventListener('pointerdown', listener);
      }, 0);
      return (): void => {
        window.clearTimeout(timerId);
        document.addEventListener('pointerdown', listener);
      };
    },
    [ref, onClickOutside],
  );
};
