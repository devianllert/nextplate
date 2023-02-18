import * as React from 'react';

import { MultiversalAppBootstrapPageProps } from '@/shared/types/multiversal-app-bootstrap-page-props';
import { MultiversalAppBootstrapProps } from '@/shared/types/multiversal-app-bootstrap-props';
import { MultiversalPageProps } from '@/shared/types/multiversal-page-props';
import { OnlyServerPageProps } from '@/shared/types/only-server-page-props';

export type ServerPageBootstrapProps = MultiversalAppBootstrapProps<
MultiversalPageProps & MultiversalAppBootstrapPageProps
>;

/**
 * Bootstraps the page, only when rendered on the server
 *
 * @param props
 */
const ServerPageBootstrap = (props: ServerPageBootstrapProps): JSX.Element => {
  const { Component, err } = props;

  const LayoutComponent = Component.Layout ?? React.Fragment;

  // When the page is served by the server, some server-only properties are available
  // eslint-disable-next-line react/destructuring-assignment
  const pageProps = props.pageProps as unknown as MultiversalPageProps<OnlyServerPageProps>;

  const injectedPageProps: MultiversalPageProps<OnlyServerPageProps> = {
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
