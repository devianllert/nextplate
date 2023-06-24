import * as React from 'react';

export interface UseDelayedLoadingOptions {
  /**
   * The amount of time in `ms` before the loading fallback is displayed.
   */
  delay?: number;

  /**
   * The minimum amount of time in `ms` the loading fallback will be displayed for.
   */
  minDuration?: number | null;

  /**
   * When this prop is `true` the delay will be started.
   */
  loading?: boolean;

  /**
   * The initial loading state.
   */
  initialLoading?: boolean;
}

/**
 * The `useDelayedLoading` hook is used to prevent the display of your loading component
 * until a certain amount of time has passed.
 */
export const useDelayedLoading = (props: UseDelayedLoadingOptions): boolean => {
  const { delay = 200, loading = false, minDuration = 500, initialLoading = false } = props;

  const [show, setShow] = React.useState(initialLoading);

  React.useEffect(() => {
    if (!show && loading) {
      const timer = setTimeout(() => setShow(true), delay);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [delay, loading, show]);

  React.useEffect(() => {
    if (show && loading === false) {
      const timer = setTimeout(() => setShow(false), minDuration ?? 0);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [minDuration, loading, show]);

  return show;
};
