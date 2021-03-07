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
      <Component
        {...injectedPageProps}
        // @ts-ignore
        error={err}
      />
    </userSessionContext.Provider>
  );
};

export default ServerPageBootstrap;