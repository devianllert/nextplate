import * as React from 'react';

import { useComposedRefs } from '@/modules/core/react/composeRefs';

import { usePresence } from './usePresence';

export interface PresenceProps {
  present: boolean;
  children: React.ReactElement | ((props: { present: boolean }) => React.ReactElement);
}

export const Presence = (props: PresenceProps): JSX.Element | null => {
  const { present, children } = props;
  const presence = usePresence(present);

  const child = typeof children === 'function'
    ? children({ present: presence.isPresent })
    : React.Children.only(children);

  const ref = useComposedRefs(presence.ref, (child as any).ref);
  const forceMount = typeof children === 'function';

  return forceMount || presence.isPresent ? React.cloneElement(child, { ref }) : null;
};
