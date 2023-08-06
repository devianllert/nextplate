import { AppProps } from 'next/app';
import { EffableProvider } from '@effable/react';

export const withDesignSystem = (Component: AppProps['Component']) => (props: AppProps) => {
  return (
    <EffableProvider>
      <Component {...props} />
    </EffableProvider>
  );
};
