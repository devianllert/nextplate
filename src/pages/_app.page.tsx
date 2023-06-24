import '@/shared/lib/wdyr/wdyr';

import * as React from 'react';

import UniversalAppBootstrap from '@/app/components/universal-app-bootstrap';

import { EnhancedAppProps } from '@/shared/types/enhanced-app-props';
import { SSGPageProps } from '@/shared/types/ssg-page-props';
import { SSRPageProps } from '@/shared/types/ssr-page-props';

import '@/shared/design/external-styles';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  // eslint-disable-next-line global-require
  require('../../mocks');
}

/**
 * "props.pageProps" will depend on whether the page is served by server or client, SSG or SSR
 * (UniversalAppBootstrapProps<SSGPageProps> | UniversalAppBootstrapProps<SSRPageProps>) is basically a superset of AppProps (from 'next/app')
 */
type UniversalPageEntryPointProps = EnhancedAppProps<SSGPageProps> | EnhancedAppProps<SSRPageProps>;

/**
 * This file is the entry point for all pages, it initialize all pages.
 *
 * It can be executed server side or browser side.
 * It can be executed from a static build (SSG) or dynamically per request (SSR).
 *
 * We use "_app" to handle root errors and configure common behaviours and configurations across all pages. (it inits sentry, by importing our helper)
 * Some of those behaviours/config are applied based on the runtime engine (browser vs server) and on the rendering mode (dynamic vs static)
 */

/**
 * Renders the whole page
 * For the sake of readability/maintainability, we have decoupled what happens in the "render" to our "UniversalAppBootstrap" component.
 *
 * All props returned by "getInitialProps", "getServerSideProps" or "getStaticProps" are available in "props.pageProps".
 * The "Component" prop within "props.pageProps" contains the page that is being rendered.
 */
const UniversalPageEntryPoint = (props: UniversalPageEntryPointProps) => <UniversalAppBootstrap {...props} />;

/**
 * Note: We have disabled the use of getInitialProps by default, because it's what's recommended since v9.3,
 * feel free to use it if needed, but beware you'll opt-out of automated static optimization for all pages by doing so.
 *
 * By default, all pages will be served statically (using automated static optimization)
 * If the page uses "getStaticProps", then it will use SSG. (a static build will be generated in production, in development it'll simulate a static build)
 * If the page uses "getServerSideProps" or "getInitialProps", then it will use SSR. (your request will be served dynamically by a Serverless Function (AKA AWS Lambda))
 *
 * From the official doc:
 * If you're using Next.js 9.3 or newer, we recommend that you use getStaticProps or getServerSideProps instead of getInitialProps.
 * These new data fetching methods allow you to have a granular choice between static generation and server-side rendering.
 *
 * @see https://nextjs.org/docs/api-reference/data-fetching/getInitialProps Recommendations regarding "getInitialProps"
 */
// UniversalPageEntryPoint.getInitialProps = async (props) => {};

/**
 * Will be called once for every metric that has to be reported.
 *
 * There are, at minimum, 3 metrics being received (Next.js-hydration, FCP and TTFB)
 * Then, 2 other metrics can be received optionally (FID, LCP)
 *
 * @param metrics
 * @see https://web.dev/vitals/ Essential metrics for a healthy site
 * @see https://nextjs.org/blog/next-9-4#integrated-web-vitals-reporting Initial release notes
 */
export { reportWebVitals } from '@/shared/lib/web-vitals';

export default UniversalPageEntryPoint;
