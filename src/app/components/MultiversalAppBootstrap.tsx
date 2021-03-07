import { FunctionComponent, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import isEmpty from 'lodash.isempty';
import size from 'lodash.size';
import isBrowser from '@/common/utils/isBrowser';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { deserializeSafe } from '@/modules/core/serializeSafe/deserializeSafe';
import { useApollo } from '@/modules/core/apollo/apolloClient';
import { MultiversalAppBootstrapProps } from '../types/MultiversalAppBootstrapProps';
import BrowserPageBootstrap, { BrowserPageBootstrapProps } from './BrowserPageBootstrap';
import ServerPageBootstrap, { ServerPageBootstrapProps } from './ServerPageBootstrap';
import { getComponentName } from '../getComponentName';

export type Props = MultiversalAppBootstrapProps<SSGPageProps> | MultiversalAppBootstrapProps<SSRPageProps>;

/**
 * Bootstraps a page and renders it
 *
 * Basically does everything a Page component needs to be rendered.
 * All behaviors defined here are applied across the whole application (they're common to all pages)
 *
 * @param props
 */
const MultiversalAppBootstrap: FunctionComponent<Props> = (props): JSX.Element => {
  const {
    Component,
    pageProps,
    router,
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const [isSSGFallbackInitialBuild] = useState<boolean>(isEmpty(pageProps) && router?.isFallback === true);
  const pageComponentName = getComponentName(Component);
  const apolloClient = useApollo<SSGPageProps | SSRPageProps>(pageProps);

  const {
    serializedDataset, // Size might be too big
    ...restPageProps
  } = pageProps; // XXX Exclude all non-meaningful props that might be too large for Sentry to handle, to avoid "403 Entity too large"
  const serializedDatasetLength = (serializedDataset ?? '').length;

  const pageBootstrapProps = {
    ...props,
    router,
    pageProps: {
      ...pageProps,
      isSSGFallbackInitialBuild,
    },
  };

  if (isBrowser() && process.env.NEXT_PUBLIC_APP_STAGE !== 'production') { // Avoids log clutter on server
    console.debug('MultiversalAppBootstrap.props', props); // eslint-disable-line no-console
  }

  // Display a loader (we could use a skeleton too) when this happens, so that the user doesn't face a white page until the page is generated and displayed
  // When router.isFallback becomes "false", then it'll mean the page has been generated and rendered and we can display it, instead of the loader
  if (isSSGFallbackInitialBuild && router?.isFallback) {
    return (
      // <Loader />
      <div>...Loading</div>
    );
  }

  if (pageProps.isReadyToRender || pageProps.statusCode === 404) {
    // Avoids noise when building the whole app
    if (!process.env.IS_SERVER_INITIAL_BUILD) {
      console.info('MultiversalAppBootstrap - App is ready, rendering...');
    }

    // Unrecoverable error, we can't even display the layout because we don't have the minimal required information to properly do so.
    // The reason can be a UI crash (something broke due to the user's interaction) and a top-level error was thrown in props.err.
    // Or, it can be because no serializedDataset was provided.
    // Either way, we display the error page, which will take care of reporting the error to Sentry and display an error message depending on the environment.
    if (typeof serializedDataset !== 'string') {
      // eslint-disable-next-line no-console
      console.log('props', props);

      if (props.err) {
        const error = new Error(`Fatal error - A top-level error was thrown by the application, which caused the Page.props to be lost. \n
        The page cannot be shown to the end-user, an error page will be displayed.`);
        console.error(error);

        return (
          <div>{error.message}</div>
        );

        // return (
        //   <ErrorPage
        //     err={props.err}
        //     statusCode={500}
        //     isReadyToRender={true}
        //   >
        //     <DefaultErrorLayout
        //       error={props.err}
        //       context={pageProps}
        //     />
        //   </ErrorPage>
        // );
      } else {
        const error = new Error(`Fatal error - Unexpected "serializedDataset" passed as page props.\n
          Expecting string, but got "${typeof serializedDataset}".\n
          This error is often caused by returning an invalid "serializedDataset" from a getStaticProps/getServerSideProps.\n
          Make sure you return a correct value, using "serializeSafe".`);

        return (
          <div>{error.message}</div>
        );

        // return (
        //   <ErrorPage
        //     err={error}
        //     statusCode={500}
        //     isReadyToRender={true}
        //   >
        //     <DefaultErrorLayout
        //       error={error}
        //       context={pageProps}
        //     />
        //   </ErrorPage>
        // );
      }
    }

    if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
      // XXX It's too cumbersome to do proper typings when type changes
      //  The "customer" was forwarded as a JSON-ish string (using Flatten) in order to avoid circular dependencies issues (SSG/SSR)
      //  It now being converted back into an object to be actually usable on all pages
      // eslint-disable-next-line no-console
      console.debug('pageProps.serializedDataset length (bytes)', (serializedDataset as unknown as string)?.length);
      // console.debug('serializedDataset', serializedDataset);
    }

    const dataset = deserializeSafe(serializedDataset);

    if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production' && isBrowser()) {
      // eslint-disable-next-line no-console
      console.debug(`pageProps.dataset (${size(Object.keys(dataset))} items)`, dataset);
    }

    /*
     * We split the rendering between server and browser
     * There are actually 3 rendering modes, each of them has its own set of limitations
     *  1. SSR (doesn't have access to browser-related features (LocalStorage), but it does have access to request-related data (cookies, HTTP headers))
     *  2. Server during SSG (doesn't have access to browser-related features (LocalStorage), nor to request-related data (cookies, localStorage, HTTP headers))
     *  3. Static rendering (doesn't have access to server-related features (HTTP headers), but does have access to request-related data (cookie) and browser-related features (LocalStorage))
     *
     * What we do here, is to avoid rendering browser-related stuff if we're not running in a browser, because it cannot work properly.
     * (e.g: Generating cookies will work, but they won't be stored on the end-user device, and it would create "Text content did not match" warnings, if generated from the server during SSG)
     *
     * So, the BrowserPageBootstrap does browser-related stuff and then call the PageBootstrap which takes care of stuff that is universal (identical between browser and server)
     *
     * XXX If you're concerned regarding React rehydration, read our talk with Josh, author of https://joshwcomeau.com/react/the-perils-of-rehydration/
     *  https://twitter.com/Vadorequest/status/1257658553361408002
     *
     * XXX There may be more rendering modes - See https://github.com/vercel/next.js/discussions/12558#discussioncomment-12303
     */
    let browserPageBootstrapProps: BrowserPageBootstrapProps;
    let serverPageBootstrapProps: ServerPageBootstrapProps;

    if (isBrowser()) {
      browserPageBootstrapProps = {
        ...props,
        router,
        pageProps: {
          ...pageProps,
          isSSGFallbackInitialBuild,
        },
      };
    } else {
      serverPageBootstrapProps = {
        ...props,
        router,
        pageProps: {
          ...pageProps,
          isSSGFallbackInitialBuild,
        },
      };
    }

    return (
      <ApolloProvider client={apolloClient}>
        {isBrowser() ? (
          <BrowserPageBootstrap {...browserPageBootstrapProps} />
        ) : (
          <ServerPageBootstrap {...serverPageBootstrapProps} />
        )}
      </ApolloProvider>
    );
  }

  // We wait for out props to contain "isReadyToRender: true", which means they've been set correctly by either getInitialProps/getStaticProps/getServerProps
  // This helps avoid multiple useless renders (especially in development mode) and thus avoid noisy logs
  // XXX I've recently tested without it and didn't notice any more logs than expected/usual. Maybe this was from a time where there were multiple full-renders? It may be removed if so (TODO later with proper testing)
  // eslint-disable-next-line no-console
  console.info('MultiversalAppBootstrap - App is not ready yet, waiting for isReadyToRender');
  return null;
};

export default MultiversalAppBootstrap;