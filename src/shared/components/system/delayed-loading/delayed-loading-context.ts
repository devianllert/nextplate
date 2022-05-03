import { createContext } from '@/shared/lib/react';

export interface DelayedLoadingContextValue {
  loading: boolean;
}

export const [DelayedLoadingProvider, useDelayedLoadingContext] = createContext<DelayedLoadingContextValue>('DelayedLoading', {
  loading: false,
});
