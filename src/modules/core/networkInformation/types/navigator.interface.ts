import { NetworkInformation } from './NetworkInformation.interface';

export interface ExtendedNavigator extends Omit<Navigator['connection'], 'connection'> {
  connection: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}
