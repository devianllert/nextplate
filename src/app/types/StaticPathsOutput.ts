import { CommonServerSideParams } from './CommonServerSideParams';

/**
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type StaticPathsOutput<E extends {} = {}> = {
  // See https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
  fallback: boolean | 'blocking';
  paths: (
    | string
    | {
      params: CommonServerSideParams<E>;
    }
  )[];
};
