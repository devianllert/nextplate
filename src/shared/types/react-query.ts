import { DehydratedState } from 'react-query';

export const REACT_QUERY_STATE_PROP_NAME = '__REACT_QUERY_STATE__';

export type ReactQueryState = {
  [REACT_QUERY_STATE_PROP_NAME]?: DehydratedState;
};
