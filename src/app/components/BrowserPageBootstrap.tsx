import * as React from 'react';
import { useTranslation } from 'next-i18next';

import { MultiversalPageProps } from '@/layouts/core/types/MultiversalPageProps';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import UniversalCookiesManager from '@/modules/core/cookiesManager/UniversalCookiesManager';
import { createLogger } from '@/modules/core/logging/logger';
import { UserSemiPersistentSession } from '@/modules/core/userSession/types/UserSemiPersistentSession';
import userSessionContext from '@/modules/core/userSession/userSessionContext';
import { MultiversalAppBootstrapPageProps } from '../types/MultiversalAppBootstrapPageProps';
import { MultiversalAppBootstrapProps } from '../types/MultiversalAppBootstrapProps';

const logger = createLogger('BrowserPageBootstrap');

export type BrowserPageBootstrapProps = MultiversalAppBootstrapProps<MultiversalPageProps & MultiversalAppBootstrapPageProps>;

/**
 * Bootstraps the page, only when rendered on the browser
 *
 * @param props
 */
const BrowserPageBootstrap = (props: BrowserPageBootstrapProps): JSX.Element => {
  const { Component, err, router } = props;

  const {
    t,
    i18n,
  } = useTranslation(undefined);

  const LayoutComponent = Component.Layout ?? React.Fragment;

  const cookiesManager: UniversalCookiesManager = new UniversalCookiesManager(); // On browser, we can access cookies directly (doesn't need req/res or page context)
  const userSession: UserSemiPersistentSession = cookiesManager.getUserData();

  // When the page is served by the browser, some browser-only properties are available
  // eslint-disable-next-line react/destructuring-assignment
  const pageProps = (props.pageProps as unknown) as MultiversalPageProps<OnlyBrowserPageProps>;

  const injectedPageProps: MultiversalPageProps<OnlyBrowserPageProps> = {
    ...pageProps,
    cookiesManager,
    userSession,
  };

  // In non-production stages, bind some utilities to the browser's DOM, for ease of quick testing
  if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (window as unknown as any).router = router;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (window as unknown as any).i18n = i18n;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (window as unknown as any).t = t;

    logger.info(`Utilities have been bound to the DOM for quick testing (only in non-production stages):
        - i18n
        - router
        - t
    `);
  }

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

export default BrowserPageBootstrap;
