import * as React from 'react';

import { useTranslation } from 'next-i18next';

import { createLogger } from '@/shared/lib/logging/logger';
import { MultiversalAppBootstrapPageProps } from '@/shared/types/multiversal-app-bootstrap-page-props';
import { MultiversalAppBootstrapProps } from '@/shared/types/multiversal-app-bootstrap-props';
import { MultiversalPageProps } from '@/shared/types/multiversal-page-props';
import { OnlyBrowserPageProps } from '@/shared/types/only-browser-page-props';

const logger = createLogger('BrowserPageBootstrap');

export type BrowserPageBootstrapProps = MultiversalAppBootstrapProps<
MultiversalPageProps & MultiversalAppBootstrapPageProps
>;

/**
 * Bootstraps the page, only when rendered on the browser
 *
 * @param props
 */
const BrowserPageBootstrap = (props: BrowserPageBootstrapProps): JSX.Element => {
  const { Component, err, router } = props;

  const { t, i18n } = useTranslation(undefined);

  const LayoutComponent = Component.Layout ?? React.Fragment;

  // When the page is served by the browser, some browser-only properties are available
  // eslint-disable-next-line react/destructuring-assignment
  const pageProps = props.pageProps as unknown as MultiversalPageProps<OnlyBrowserPageProps>;

  const injectedPageProps: MultiversalPageProps<OnlyBrowserPageProps> = {
    ...pageProps,
  };

  // In non-production stages, bind some utilities to the browser's DOM, for ease of quick testing
  if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
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
    }, []);
  }

  return (
    <LayoutComponent>
      <Component
        {...injectedPageProps}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore∫
        error={err}
      />
    </LayoutComponent>
  );
};

export default BrowserPageBootstrap;
