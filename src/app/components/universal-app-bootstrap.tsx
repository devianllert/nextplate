import * as React from 'react';
import { isBrowser } from '@effable/misc';
import * as Sentry from '@sentry/nextjs';
import { useTranslation } from 'next-i18next';

import { withProviders } from '@/app/providers';

import ErrorPage from '@/pages/_error.page';

import { NProgressRoot } from '@/features/nprogress';

import { DefaultErrorLayout } from '@/shared/components/error-handling';
import { createLogger } from '@/shared/lib/logging/logger';
import { configureSentryI18n } from '@/shared/lib/sentry';
import { EnhancedAppProps } from '@/shared/types/enhanced-app-props';
import { SSGPageProps } from '@/shared/types/ssg-page-props';
import { SSRPageProps } from '@/shared/types/ssr-page-props';

import BrowserPageBootstrap, { BrowserPageBootstrapProps } from './browser-page-bootstrap';
import ServerPageBootstrap, { ServerPageBootstrapProps } from './server-page-bootstrap';

type Props = EnhancedAppProps<SSGPageProps> | EnhancedAppProps<SSRPageProps>;

const fileLabel = 'app/components/UniversalAppBootstrap';
const logger = createLogger(fileLabel);

/**
 * Bootstraps a page and renders it
 *
 * Basically does everything a Page component needs to be rendered.
 * All behaviors defined here are applied across the whole application (they're common to all pages)
 *
 * @param props
 */
const UniversalAppBootstrap = (props: Props) => {
  const { pageProps, router, err } = props;

  const { i18n } = useTranslation();

  Sentry.addBreadcrumb({
    category: fileLabel,
    message: `Rendering ${fileLabel}`,
    level: 'debug',
  });

  configureSentryI18n(i18n.language);

  if (isBrowser() && process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
    // Avoids log clutter on server
    logger.debug('UniversalAppBootstrap.props', props);
  }

  // Display a loader (we could use a skeleton too) when this happens, so that the user doesn't face a white page until the page is generated and displayed
  // When router.isFallback becomes "false", then it'll mean the page has been generated and rendered and we can display it, instead of the loader
  if (router?.isFallback) {
    return <div>...Loading</div>;
  }

  if (err) {
    const error =
      new Error(`Fatal error - A top-level error was thrown by the application, which caused the Page.props to be lost. \n
    The page cannot be shown to the end-user, an error page will be displayed.`);
    logger.error(error);

    return (
      <ErrorPage err={err} statusCode={500} isReadyToRender>
        <DefaultErrorLayout error={err} context={pageProps} />
      </ErrorPage>
    );
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
   * Note: If you're concerned regarding React rehydration, read our talk with Josh, author of https://joshwcomeau.com/react/the-perils-of-rehydration/
   *  https://twitter.com/Vadorequest/status/1257658553361408002
   *
   * Note: There may be more rendering modes - See https://github.com/vercel/next.js/discussions/12558#discussioncomment-12303
   */
  const universalPageBootstrapProps: ServerPageBootstrapProps & BrowserPageBootstrapProps = {
    ...props,
    router,
    pageProps: {
      ...pageProps,
    },
  };

  return (
    <>
      <NProgressRoot showAfterMs={100} />

      {isBrowser() ? (
        <BrowserPageBootstrap {...universalPageBootstrapProps} />
      ) : (
        <ServerPageBootstrap {...universalPageBootstrapProps} />
      )}
    </>
  );
};

export default withProviders(UniversalAppBootstrap);
