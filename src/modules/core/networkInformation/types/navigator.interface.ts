import { NetworkInformation } from './NetworkInformation.interface';

export interface ExtendedNavigator extends Navigator {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}
