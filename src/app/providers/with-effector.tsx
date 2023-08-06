import { AppProps } from 'next/app';
import { EffectorNext } from '@effector/next';

import { EFFECTOR_STATE_KEY, EffectorState } from '@/shared/lib/effector';

type AppWithEffectorState = AppProps<EffectorState>;

export const withEffector = (Component: AppWithEffectorState['Component']) => (props: AppWithEffectorState) => {
  const { pageProps } = props;

  const values = pageProps[EFFECTOR_STATE_KEY];

  return (
    <EffectorNext values={values}>
      <Component {...props} />
    </EffectorNext>
  );
};
