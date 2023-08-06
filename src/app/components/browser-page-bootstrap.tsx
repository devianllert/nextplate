import * as React from 'react';
import { useTranslation } from 'next-i18next';

import { createLogger } from '@/shared/lib/logging/logger';
import { EnhancedAppProps } from '@/shared/types/enhanced-app-props';
import { UniversalPageProps } from '@/shared/types/universal-page-props';

const logger = createLogger('BrowserPageBootstrap');

export type BrowserPageBootstrapProps = EnhancedAppProps<UniversalPageProps>;

/**
 * Bootstraps the page, only when rendered on the browser
 *
 * @param props
 */
const BrowserPageBootstrap = (props: BrowserPageBootstrapProps) => {
  const { Component, err, router } = props;

  const { t, i18n } = useTranslation();

  const LayoutComponent = Component.Layout ?? React.Fragment;

  // When the page is served by the browser, some browser-only properties are available
  // eslint-disable-next-line react/destructuring-assignment
  const pageProps = props.pageProps as unknown as UniversalPageProps;

  const injectedPageProps: UniversalPageProps = {
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
        // @ts-ignore
        error={err}
      />
    </LayoutComponent>
  );
};

export default BrowserPageBootstrap;
