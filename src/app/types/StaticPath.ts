import { CommonServerSideParams } from './CommonServerSideParams';

// eslint-disable-next-line @typescript-eslint/ban-types
export type StaticPath<E extends {} = {}> = {
  params: CommonServerSideParams<E>;
};
