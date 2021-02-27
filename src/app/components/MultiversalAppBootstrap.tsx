import { FunctionComponent, useState } from 'react';
import isEmpty from 'lodash.isempty';
import isBrowser from '@/common/utils/isBrowser';
import { MultiversalAppBootstrapProps } from '../types/MultiversalAppBootstrapProps';
import BrowserPageBootstrap from './BrowserPageBootstrap';
import ServerPageBootstrap from './ServerPageBootstrap';

/**
 * Bootstraps a page and renders it
 *
 * Basically does everything a Page component needs to be rendered.
 * All behaviors defined here are applied across the whole application (they're common to all pages)
 *
 * @param props
 */
const MultiversalAppBootstrap: FunctionComponent<MultiversalAppBootstrapProps> = (props): JSX.Element => {
  const {
    pageProps,
    router,
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const [isSSGFallbackInitialBuild] = useState<boolean>(isEmpty(pageProps) && router?.isFallback === true);

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

  return (
    <>
      {isBrowser() ? (
        <BrowserPageBootstrap {...pageBootstrapProps} />
      ) : (
        <ServerPageBootstrap {...pageBootstrapProps} />
      )}
    </>
  );
};

export default MultiversalAppBootstrap;
