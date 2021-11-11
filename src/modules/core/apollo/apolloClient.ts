import * as React from 'react';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash.isequal';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

export type ApolloState = {
  [APOLLO_STATE_PROP_NAME]: NormalizedCacheObject;
};

let apolloClient: ApolloClient<NormalizedCacheObject>;

/**
 * Create a new apollo client instance.
 */
function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  const httpLink: ApolloLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT, // Server URL (must be absolute)
    // Headers applied here will be applied for all requests
    // See the use of the "options" when running a graphQL query to specify options per-request at https://www.apollographql.com/docs/react/api/react-hooks/#options
    headers: {
      authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
    },
    credentials: 'same-origin', // XXX See https://www.apollographql.com/docs/react/recipes/authentication#cookie
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: httpLink,
    cache: new InMemoryCache(),
  });
}

/**
 * Initiate apollo based on the environment (client or server).
 *
 * @param initialState
 * @returns {ApolloClient<NormalizedCacheObject>}
 */
export function initializeApollo(initialState: Record<string, any> | null = null): ApolloClient<NormalizedCacheObject> {
  const client = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = client.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    client.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return client;
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = client;
  }

  return client;
}

/**
 * Returns the apollo state.
 */
export function getApolloState(client: ApolloClient<NormalizedCacheObject>): NormalizedCacheObject {
  return client.cache.extract();
}

/**
 * Returns an instance of apollo client.
 */
export function useApollo<T>(pageProps: T): ApolloClient<NormalizedCacheObject> {
  const state: Record<string, any> = pageProps[APOLLO_STATE_PROP_NAME];

  const store = React.useMemo(() => initializeApollo(state), [state]);

  return store;
}
