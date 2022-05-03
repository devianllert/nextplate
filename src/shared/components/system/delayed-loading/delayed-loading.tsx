import * as React from 'react';
import { DelayedLoadingProvider } from './delayed-loading-context';
import { useDelayedLoading } from './use-delayed-loading';

export interface DelayedLoadingProps {
  /**
   * The amount of time in ms before the loading fallback is displayed
   */
  delay?: number;

  /**
   * The minimum amount of time in ms the loading fallback will be displayed for
   */
  fallbackDelay?: number | null;

  /**
   *
   */
  loading?: boolean;

  /**
   * The content
   */
  children?: (props: { loading: boolean }) => React.ReactNode;
}

/**
 * The `DelayedLoading` component is used to prevent the display of your loading component
 * until a certain amount of time has passed.
 */
export const DelayedLoading = (props: DelayedLoadingProps) => {
  const {
    delay = 200,
    loading = false,
    children,
    fallbackDelay = 500,
  } = props;

  const show = useDelayedLoading({
    delay,
    loading,
    fallbackDelay,
  });

  return (
    <DelayedLoadingProvider loading={show}>
      {children?.({ loading: show })}
    </DelayedLoadingProvider>
  );
};
