import * as React from 'react';

import { isBrowser } from '@effable/misc';

import { managedEventListener } from '@/shared/lib/managed-event-listener';

/**
 * Tracks information about the network's availability.
 */
export const useNetworkAvailability = (): boolean => {
  const [online, setOnline] = React.useState(isBrowser() ? navigator.onLine : true);

  React.useEffect(() => {
    const cleanup1 = managedEventListener(window, 'offline', () => setOnline(false));
    const cleanup2 = managedEventListener(window, 'online', () => setOnline(true));

    return (): void => {
      cleanup1();
      cleanup2();
    };
  }, []);

  return online;
};
