import * as React from 'react';

import { MultiversalPageProps } from '@/layouts/core/types/MultiversalPageProps';
import { OnlyServerPageProps } from '@/layouts/core/types/OnlyServerPageProps';
import userSessionContext from '@/modules/core/userSession/userSessionContext';
import { MultiversalAppBootstrapPageProps } from '../types/MultiversalAppBootstrapPageProps';
import { MultiversalAppBootstrapProps } from '../types/MultiversalAppBootstrapProps';

export type ServerPageBootstrapProps = MultiversalAppBootstrapProps<MultiversalPageProps & MultiversalAppBootstrapPageProps>;

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
  const pageProps = (props.pageProps as unknown) as MultiversalPageProps<OnlyServerPageProps>;

  const injectedPageProps: MultiversalPageProps<OnlyServerPageProps> = {
    ...pageProps,
  };

  const {
    userSession,
  } = pageProps;

  return (
    <userSessionContext.Provider value={{ ...userSession }}>
      <LayoutComponent>
        <Component
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...injectedPageProps}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          error={err}
        />
      </LayoutComponent>
    </userSessionContext.Provider>
  );
};

export default ServerPageBootstrap;
