import * as React from 'react';

import { managedEventListener } from '@/common/utils/managedEventListener';

import { getNavigatorConnection, getNetworkInformation } from '../networkInformation';

import { NetworkInformation } from '../types/NetworkInformation.interface';

/**
 * Tracks information about the device's network connection.
 */
export const useNetworkInformation = (): NetworkInformation | undefined => {
  const [networkInformation, setNetworkInformation] = React.useState(getNetworkInformation());

  React.useEffect(() => {
    const connection = getNavigatorConnection();

    if (connection) {
      return managedEventListener(
        connection,
        'change',
        () => setNetworkInformation(getNavigatorConnection()),
      );
    }

    return undefined;
  }, []);

  return networkInformation;
};
