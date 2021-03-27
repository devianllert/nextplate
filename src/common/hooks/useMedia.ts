import { useEffect, useState } from 'react';

import isBrowser from '@/common/utils/isBrowser';

/**
 * Hook that tracks state of a CSS media query.
 */
export const useMedia = (query: string, defaultState = false): boolean => {
  const [state, setState] = useState(isBrowser() ? (): boolean => window.matchMedia(query).matches : defaultState);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent): void => {
      setState(event.matches);
    };

    mediaQueryList.addEventListener('change', listener);

    return (): void => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return state;
};
