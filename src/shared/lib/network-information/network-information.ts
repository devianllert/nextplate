import { isBrowser } from '@effable/misc';

import { ExtendedNavigator } from './types/navigator.interface';
import {
  NetworkConnectionType,
  NetworkInformation,
  NetworkInformationSpeed,
} from './types/network-information.interface';

/**
 * Returns information about the device's network connection.
 *
 * Note: You should check JS environment by yourself or use `getNetworkInformation` function.
 */
export const getNavigatorConnection = (): NetworkInformation | undefined => {
  return (
    (navigator as unknown as ExtendedNavigator)?.connection ??
    (navigator as unknown as ExtendedNavigator)?.mozConnection ??
    (navigator as unknown as ExtendedNavigator)?.webkitConnection
  );
};

/**
 * Returns information about the device's network connection.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
 */
export const getNetworkInformation = (): NetworkInformation | undefined => {
  if (isBrowser()) {
    return getNavigatorConnection();
  } else {
    return undefined;
  }
};

/**
 * Returns the online status of the browser.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine
 */
export const getNetworkAvailability = (): boolean => {
  return isBrowser() ? navigator?.onLine : true;
};

/**
 * Returns the device's network connection speed.
 *
 * Meant to be used outside of React components.
 *
 * Note: If you want to use this in a React component and react to network changes, you should rather use the `useNetworkInformation`
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType
 */
export const getNetworkInformationSpeed = (): NetworkInformationSpeed => {
  let networkInformation: NetworkInformation | undefined;

  if (isBrowser()) {
    networkInformation = getNavigatorConnection();
  } else {
    return 'not-applicable';
  }

  return networkInformation?.effectiveType || 'unknown';
};

/**
 * Returns the device's network connection type.
 *
 * Meant to be used outside of React components.
 *
 * Note: If you want to use this in a React component and react to network changes, you should rather use the `useNetworkInformation`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/type
 */
export const getNetworkConnectionType = (): NetworkConnectionType => {
  let networkInformation: NetworkInformation | undefined;

  if (isBrowser()) {
    networkInformation = getNavigatorConnection();
  } else {
    return 'not-applicable';
  }

  return networkInformation?.type ?? 'unknown';
};
