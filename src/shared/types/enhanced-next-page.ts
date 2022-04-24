import * as React from 'react';
import { NextPage } from 'next';

// eslint-disable-next-line @typescript-eslint/ban-types
export type EnhancedNextPage<P = {}, IP = P> = NextPage<P, IP> & {
  /**
   * The injected layout component
   * @see https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
   */
  Layout?: React.FC;
};
