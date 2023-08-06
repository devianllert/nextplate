import * as React from 'react';

import { useDelayedLoading, UseDelayedLoadingOptions } from './use-delayed-loading';

export interface DelayedLoadingProps extends UseDelayedLoadingOptions {
  /**
   * The content.
   */
  children?: (props: { loading: boolean }) => React.ReactNode;
}

/**
 * The `DelayedLoading` component is used to prevent the display of your loading component
 * until a certain amount of time has passed.
 */
export const DelayedLoading = (props: DelayedLoadingProps) => {
  const { delay = 200, loading = false, children, minDuration = 500, initialLoading = false } = props;

  const show = useDelayedLoading({
    delay,
    loading,
    minDuration,
    initialLoading,
  });

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children?.({ loading: show })}</>
  );
};
