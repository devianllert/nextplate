import '@/shared/lib/wdyr/wdyr';

import * as React from 'react';

import MultiversalAppBootstrap from '@/app/components/multiversal-app-bootstrap';
import { MultiversalAppBootstrapProps } from '@/app/types/multiversal-app-bootstrap-props';
import { SSGPageProps } from '@/shared/types/ssg-page-props';
import { SSRPageProps } from '@/shared/types/ssr-page-props';

/**
 * "props.pageProps" will depend on whether the page is served by server or client, SSG or SSR
 * (MultiversalAppBootstrapProps<SSGPageProps> | MultiversalAppBootstrapProps<SSRPageProps>) is basically a superset of AppProps (from 'next/app')
 */
type MultiversalPageEntryPointProps = MultiversalAppBootstrapProps<SSGPageProps> | MultiversalAppBootstrapProps<SSRPageProps>;

/**
 * This file is the entry point for all pages, it initialize all pages.
 *
 * It can be executed server side or browser side.
 * It can be executed from a static build (SSG) or dynamically per request (SSR).
 *
 * We use "_app" to handle root errors and configure common behaviours and configurations across all pages. (it inits sentry, by importing our helper)
 * Some of those behaviours/config are applied based on the runtime engine (browser vs server) and on the rendering mode (dynamic vs static)
 *
 * Definitions:
 * - Universal: A universal code (AKA isomorphic) runs anywhere (on both browsers and servers), it is compatible with both, but may behave slightly differently
 * - Multiversal: A multiversal code is universal (runs anywhere) and also handles all rendering modes (dynamic and static)
 *    The concept of "Multiversal" has been invented by myself, because we lack proper definition for this kind of things (it's fairly new, feel free to propose better)
 *    It's very important for developers to know when a particular piece of code is gonna be executed (server? browser? static? dynamic request? etc.)
 *
 * Next.js provides huge capabilities, but with such comes complexity.
 * You may have a hard time knowing for sure if a particular function will run identically on browser + server + statically + dynamically
 * For instance, if you depend on cookies, then you'll have a different behaviour whether executing the code:
 *  - During the SSG rendering (server side, but no request and no access to user-data or request-data)
 *  - During a server side request (no access to browser data (localstorage, browser cookies)
 *  - During a client side request (no access to server data (server cookies, HTTP headers)
 *
 * Note: It's easy to get lost. The term of "Multiversal" is used to make it obvious that a particular piece of code runs in any situation.
 *
 * @see https://nextjs.org/docs/advanced-features/custom-app Custom _app
 * @see https://nextjs.org/docs/basic-features/typescript#custom-app TypeScript for _app
 * @see https://stackoverflow.com/a/43862885/2391795 Some "Universal" definition (feel free to disagree)
 */

/**
 * Renders the whole page
 * For the sake of readability/maintainability, we have decoupled what happens in the "render" to our "MultiversalAppBootstrap" component.
 *
 * All props returned by "getInitialProps", "getServerSideProps" or "getStaticProps" are available in "props.pageProps".
 * The "Component" prop within "props.pageProps" contains the page that is being rendered.
 *
 * Note: Multiversal - Executed in any case
 *  req, res are NOT accessible here
 *
 * @return {JSX.Element}
 */
const MultiversalPageEntryPoint = (props: MultiversalPageEntryPointProps): JSX.Element => (
  <MultiversalAppBootstrap {...props} />
);

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
export { reportWebVitals } from '@/shared/lib/web-vitals/report-web-vitals';

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
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation "getStaticProps" doc
 * @see https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering "getServerSideProps" doc
 */
// MultiversalPageEntryPoint.getInitialProps = async (props: AppInitialProps): Promise<MultiversalAppBootstrapProps> {}

export default MultiversalPageEntryPoint;
