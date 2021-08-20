import { GetStaticProps, GetStaticPropsResult } from 'next';

import { serializeSafe } from '@/modules/core/serializeSafe/serializeSafe';

import { SSGPageProps } from './types/SSGPageProps';
import { getTranslationsConfig } from './translations';

/**
 * Only executed on the server side at build time.
 * Computes all static paths that should be available for all SSG pages.
 * Necessary when a page has dynamic routes and uses "getStaticProps", in order to build the HTML pages.
 *
 * You can use "fallback" option to avoid building all page variants and allow runtime fallback.
 *
 * Meant to avoid code duplication.
 * Can be overridden for per-page customisation (e.g: deepmerge).
 *
 * XXX Core component, meant to be used by other layouts, shouldn't be used by other components directly.
 *
 * @return Static paths that will be used by "getCoreStaticProps" to generate pages
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
 */
// export const getCoreStaticPaths: GetStaticPaths<CommonServerSideParams> = async (
//   context: GetStaticPathsContext,
// ): Promise<StaticPathsOutput> => {
//   const paths: StaticPath[] = map(
//     supportedLocales,
//     (supportedLocale: I18nLocale): StaticPath => {
//       return {
//         params: {
//           locale: supportedLocale.name,
//         },
//       };
//     },
//   );

//   return {
//     fallback: false,
//     paths,
//   };
// };

/**
 * Returns a "getStaticProps" function.
 *
 * Meant to be avoid duplication of the `serverSideTranslations` for static pages that need translations.
 *
 * @param namespaces
 */
export const getTranslationsStaticProps = (namespaces: string[] = []): GetStaticProps<SSGPageProps> => {
  /**
   * Only executed on the server side at build time.
   * Computes all static props that should be available for all SSG pages.
   *
   * Note that when a page uses "getStaticProps", then "_app:getInitialProps" is executed (if defined) but not actually used by the page,
   * only the results from getStaticProps are actually injected into the page (as "SSGPageProps").
   *
   * Meant to avoid code duplication.
   * Can be overridden for per-page customisation (e.g: deepmerge).
   *
   * XXX Core component, meant to be used by other layouts, shouldn't be used by other components directly.
   *
   * @return Props (as "SSGPageProps") that will be passed to the Page component, as props (known as "pageProps" in _app).
   *
   * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
   * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
   */
  const getStaticProps: GetStaticProps<SSGPageProps> = async (props): Promise<GetStaticPropsResult<SSGPageProps>> => {
    return {
      props: {
        isReadyToRender: true,
        isStaticRendering: true,
        serializedDataset: serializeSafe({}),
        ...await getTranslationsConfig(props, namespaces),
      },
    };
  };

  return getStaticProps;
};
