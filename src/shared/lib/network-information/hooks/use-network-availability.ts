import * as React from 'react';
import { isBrowser } from '@effable/misc';

/**
 * Tracks information about the network's availability.
 */
export const useNetworkAvailability = (): boolean => {
  const [online, setOnline] = React.useState(isBrowser() ? navigator.onLine : true);

  React.useEffect(() => {
    const updateOffile = () => setOnline(false);
    const updateOnline = () => setOnline(true);

    window.addEventListener('offline', updateOffile);
    window.addEventListener('online', updateOnline);

    return (): void => {
      window.removeEventListener('offline', updateOffile);
      window.removeEventListener('online', updateOnline);
    };
  }, []);

  return online;
};
