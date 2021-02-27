import { MultiversalPageProps } from '@/layouts/core/types/MultiversalPageProps';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { MultiversalAppBootstrapPageProps } from '../types/MultiversalAppBootstrapPageProps';
import { MultiversalAppBootstrapProps } from '../types/MultiversalAppBootstrapProps';

export type BrowserPageBootstrapProps = MultiversalAppBootstrapProps<MultiversalPageProps & MultiversalAppBootstrapPageProps>;

/**
 * Bootstraps the page, only when rendered on the browser
 *
 * @param props
 */
const BrowserPageBootstrap = (props: BrowserPageBootstrapProps): JSX.Element => {
  const { Component, err, router } = props;

  // When the page is served by the browser, some browser-only properties are available
  // eslint-disable-next-line react/destructuring-assignment
  const pageProps = (props.pageProps as unknown) as MultiversalPageProps<OnlyBrowserPageProps>;

  // In non-production stages, bind some utilities to the browser's DOM, for ease of quick testing
  if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (window as unknown as any).router = router;
    console.info(`Utilities have been bound to the DOM for quick testing (only in non-production stages):
        - amplitudeInstance
        - i18n
        - router
        - t
    `);
  }

  return (
    <>
      <Component
        {...pageProps}
        // @ts-ignore
        error={err}
      />
    </>
  );
};

export default BrowserPageBootstrap;
