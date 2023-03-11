/**
 * Connection speed used by the client (browser).
 *
 * Universal, will return "not-applicable" if executed on the server.
 * Not available on all browsers, only a few of them provide such API.
 *
 * Experimental feature.
 *
 * @see https://developer.mozilla.org/fr/docs/Web/API/Navigator/connection
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType
 */
export type NetworkInformationSpeed =
  // Native types
  | '2g'
  | '3g'
  | '4g'
  | 'slow-2g'
  // When the browser doesn't provide a "Connection" feature
  | 'unknown'
  // Connection speed isn't applicable on the server
  | 'not-applicable';

export type NetworkConnectionType =
  | 'bluetooth'
  | 'cellular'
  | 'ethernet'
  | 'mixed'
  | 'none'
  | 'other'
  | 'unknown'
  | 'wifi'
  | 'wimax'
  // Connection type isn't applicable on the server
  | 'not-applicable';

export interface NetworkInformation extends EventTarget {
  /**
   * Returns the effective bandwidth estimate in megabits per second,
   * rounded to the nearest multiple of 25 kilobits per seconds.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/downlink
   */
  downlink?: number;

  /**
   * Returns the maximum downlink speed, in megabits per second (Mbps), for the underlying connection technology.
   *
   * This feature is available in Web Workers.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/downlinkMax
   */
  downlinkMax?: number;

  /**
   * Returns the effective type of the connection meaning one of 'slow-2g', '2g', '3g', or '4g'.
   * This value is determined using a combination of recently observed round-trip time and downlink values.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType
   */
  effectiveType?: NetworkInformationSpeed;

  /**
   * The event that's fired when connection information changes and the change is fired on this object.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/onchange
   */
  onchange?: EventListener;

  /**
   * Returns the estimated effective round-trip time of the current connection, rounded to the nearest multiple of 25 milliseconds.
   *
   * This feature is available in Web Workers.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/rtt
   */
  rtt?: number;

  /**
   * Returns true if the user has set a reduced data usage option on the user agent.
   */
  saveData?: boolean;

  /**
   * Returns the type of connection a device is using to communicate with the network.
   *
   * This feature is available in Web Workers
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/type
   */
  type?: NetworkConnectionType;
}
