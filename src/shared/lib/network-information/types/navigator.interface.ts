import { NetworkInformation } from './network-information.interface';

export interface ExtendedNavigator extends Omit<Navigator, 'connection'> {
  connection: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}
