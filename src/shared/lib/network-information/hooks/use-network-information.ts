import * as React from 'react';

import { getNavigatorConnection, getNetworkInformation } from '../network-information';
import { NetworkInformation } from '../types/network-information.interface';

/**
 * Tracks information about the device's network connection.
 */
export const useNetworkInformation = (): NetworkInformation | undefined => {
  const [networkInformation, setNetworkInformation] = React.useState(getNetworkInformation());

  React.useEffect(() => {
    const connection = getNavigatorConnection();

    const updateNetworkInfo = () => setNetworkInformation(getNavigatorConnection());

    if (connection) {
      connection.addEventListener('change', updateNetworkInfo);

      return () => {
        connection.removeEventListener('change', updateNetworkInfo);
      };
    }

    return undefined;
  }, []);

  return networkInformation;
};
