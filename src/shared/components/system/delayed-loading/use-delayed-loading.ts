import * as React from 'react';

export interface UseDelayedLoadingOptions {
  /**
   * The amount of time in ms before the loading fallback is displayed
   */
  delay?: number;

  /**
   * The minimum amount of time in ms the loading fallback will be displayed for
   */
  fallbackDelay?: number | null;

  /**
   * state
   */
  loading?: boolean;
}

/**
 * The `useDelayedLoading` hook is used to prevent the display of your loading component
 * until a certain amount of time has passed.
 */
export const useDelayedLoading = (props: UseDelayedLoadingOptions): boolean => {
  const {
    delay = 200,
    loading = false,
    fallbackDelay = 500,
  } = props;

  const [show, setShow] = React.useState(loading);

  React.useEffect(() => {
    if (!show && loading) {
      const timer = setTimeout(() => setShow(true), delay);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [delay, loading, show]);

  React.useEffect(() => {
    if (show && loading === false) {
      const timer = setTimeout(() => setShow(false), fallbackDelay ?? 0);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [fallbackDelay, loading, show]);

  return show;
};
