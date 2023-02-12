import * as React from 'react';

import { managedEventListener } from '@/shared/lib/managed-event-listener';

import { getNavigatorConnection, getNetworkInformation } from '../network-information';
import { NetworkInformation } from '../types/network-information.interface';

/**
 * Tracks information about the device's network connection.
 */
export const useNetworkInformation = (): NetworkInformation | undefined => {
  const [networkInformation, setNetworkInformation] = React.useState(getNetworkInformation());

  React.useEffect(() => {
    const connection = getNavigatorConnection();

    if (connection) {
      return managedEventListener(connection, 'change', () => setNetworkInformation(getNavigatorConnection()));
    }

    return undefined;
  }, []);

  return networkInformation;
};
