import * as React from 'react';
import { useRouter } from 'next/router';

import { HistoryOptions, Serializers } from './queryTypes';

export interface UseQueryParamStateOptions<T> extends Partial<Serializers<T>> {
  /**
   * The operation to use on state updates.
   *
   * @default 'replace'
   */
  history?: HistoryOptions;
  defaultValue?: T;
}

export type UseQueryParamStateReturn<T> = [
  T | null,
  React.Dispatch<React.SetStateAction<T | null>>,
];

export type UseQueryParamStateOptionsWithDefault<T> = Pick<
UseQueryParamStateOptions<T>,
'parse' | 'serialize' | 'defaultValue'
> &
Partial<Omit<UseQueryParamStateOptions<T>, 'parse' | 'serialize' | 'defaultValue'>>;

/**
 * React state hook synchronized with a URL query string in Next.js
 *
 * This variant is used without a `defaultValue` supplied in the options. If
 * the query is missing in the URL, the state will be `null`.
 *
 * Example usage:
 * ```ts
 *   // Blog posts filtering by tag
 *   const [tag, selectTag] = useQueryState('tag')
 *   const filteredPosts = posts.filter(post => tag ? post.tag === tag : true)
 *   const clearTag = () => selectTag(null)
 * ```
 *
 * @param key - The URL query string key to bind to
 * @param options - Serializers (define the state data type), optional history mode.
 */
export function useQueryParamState<T = string>(
  key: string,
  options?: Partial<UseQueryParamStateOptions<T>>
): UseQueryParamStateReturn<T | null>;

/**
 * React state hook synchronized with a URL query string in Next.js
 *
 * This variant is used when a `defaultValue` is supplied in the options.
 *
 * _Note: the URL will **not** be updated with the default value if the query
 * is missing._
 *
 * Setting the value to `null` will clear the query in the URL, and return
 * the default value as state.
 *
 * Example usage:
 * ```ts
 *   const [count, setCount] = useQueryParamState('count', {
 *    ...queryTypes.integer,
 *    defaultValue: 0
 *   })
 *
 *   const increment = () => setCount(oldCount => oldCount + 1)
 *   const decrement = () => setCount(oldCount => oldCount - 1)
 *   const clearCountQuery = () => setCount(null)
 *
 *   // --
 *
 *   const [date, setDate] = useQueryParamState('date', {
 *     ...queryTypes.isoDateTime,
 *     default: new Date('2021-01-01')
 *   })
 *
 *   const setToNow = () => setDate(new Date())
 *   const addOneHour = () => {
 *     setDate(oldDate => new Date(oldDate.valueOf() + 3600_000))
 *   }
 * ```
 *
 * @param key - The URL query string key to bind to
 * @param options - Serializers (define the state data type), default value and optional history mode.
 */
export function useQueryParamState<T extends string>(key: T, options: UseQueryParamStateOptionsWithDefault<T> = {}): UseQueryParamStateReturn<T> {
  const {
    history = 'replace',
    parse = (x) => (x as unknown) as T,
    serialize = (x) => `${x}`,
    defaultValue,
  }: Partial<UseQueryParamStateOptions<T>> = options;

  const router = useRouter();

  // Memoizing the update function has the advantage of making it
  // immutable as long as `history` stays the same.
  // It reduces the amount of reactivity needed to update the state.
  const updateURL = React.useMemo(
    () => (history === 'push' ? router.push : router.replace),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [history],
  );

  const getValue = React.useCallback((): T | null => {
    const value = router.query[key] as string;
    return value !== null ? parse(value) : null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Update the state value only when the relevant key changes.
  // Because we're not calling getValue in the function argument
  // of React.useMemo, but instead using it as the function to call,
  // there is no need to pass it in the dependency array.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = React.useMemo(getValue, [router.query[key]]);

  const update = React.useCallback(
    (stateUpdater: React.SetStateAction<T | null>) => {
      const isUpdaterFunction = (
        input: unknown,
      ): input is (prevState: T | null
      ) => T | null => {
        return typeof input === 'function';
      };

      // Resolve the new value based on old value & updater
      const oldValue = getValue();
      const newValue = isUpdaterFunction(stateUpdater)
        ? stateUpdater(oldValue)
        : stateUpdater;
      // We can't rely on router.query here to avoid causing
      // unnecessary renders when other query parameters change.
      // URLSearchParams is already polyfilled by Next.js
      const query = new URLSearchParams(window.location.search);
      if (newValue === null || newValue === undefined) {
        // Don't leave value-less keys hanging
        query.delete(key);
      } else {
        query.set(key, serialize(newValue));
      }

      // Remove fragment and query from asPath
      // router.pathname includes dynamic route keys, rather than the route itself,
      // e.g. /views/[view] rather than /views/my-view
      const [asPath] = router.asPath.split(/\?|#/, 1);
      const search = query.toString();
      const { hash } = window.location;
      updateURL?.call(
        router,
        {
          pathname: router.pathname,
          hash,
          search,
        },
        {
          pathname: asPath,
          hash,
          search,
        },
        {
          shallow: true,
          scroll: false,
        },
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key, updateURL, router.asPath],
  );

  return [value ?? defaultValue ?? null, update];
}
