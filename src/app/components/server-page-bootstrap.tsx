import * as React from 'react';

import { EnhancedAppProps } from '@/shared/types/enhanced-app-props';
import { UniversalPageProps } from '@/shared/types/universal-page-props';

export type ServerPageBootstrapProps = EnhancedAppProps<UniversalPageProps>;

/**
 * Bootstraps the page, only when rendered on the server
 *
 * @param props
 */
const ServerPageBootstrap = (props: ServerPageBootstrapProps) => {
  const { Component, err } = props;

  const LayoutComponent = Component.Layout ?? React.Fragment;

  // When the page is served by the server, some server-only properties are available
  // eslint-disable-next-line react/destructuring-assignment
  const pageProps = props.pageProps as unknown as UniversalPageProps;

  const injectedPageProps: UniversalPageProps = {
    ...pageProps,
  };

  return (
    <LayoutComponent>
      <Component
        {...injectedPageProps}
        // @ts-expect-error wrong typings
        error={err}
      />
    </LayoutComponent>
  );
};

export default ServerPageBootstrap;
