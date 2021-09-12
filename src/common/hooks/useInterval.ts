import * as React from 'react';

import { useCallbackRef } from './useCallbackRef';

/**
 * Hook that allows you to use `setInterval` in functional React component with the same API.
 *
 * @param fn - Function that will be called every `delay` ms.
 * @param delay - Number representing the delay in ms. Set to `null` to "pause" the interval.
 */
export const useInterval = (fn: () => void, delay: number | null): void => {
  const onTick = useCallbackRef(fn);

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (typeof delay === 'number') {
      const intervalId = window.setInterval(onTick, delay);

      return () => window.clearInterval(intervalId);
    }
  }, [delay, onTick]);
};
