import { GetStaticProps, GetStaticPropsResult } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { initializeApollo, APOLLO_STATE_PROP_NAME, getApolloState } from '@/modules/core/apollo/apolloClient';
import serializeSafe from '@/modules/core/serializeSafe/serializeSafe';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { SSGPageProps } from './types/SSGPageProps';

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
export const getCoreStaticProps: GetStaticProps<SSGPageProps> = async (props): Promise<GetStaticPropsResult<SSGPageProps>> => {
  const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();

  // const {
  //   data,
  //   errors,
  //   loading,
  //   networkStatus,
  // }: ApolloQueryResult<{
  //   customer: Customer;
  // }> = await apolloClient.query(queryOptions);

  // if (errors) {
  //   console.error(errors);
  //   throw new Error('Errors were detected in GraphQL query.');
  // }

  // const { customer } = data || {}; // XXX Use empty object as fallback, to avoid app crash when destructuring, if no data is returned
  // const dataset = {
  //   customer,
  // };

  return {
    // Props returned here will be available as page properties (pageProps)
    props: {
      [APOLLO_STATE_PROP_NAME]: getApolloState(apolloClient),
      serializedDataset: serializeSafe({}),
      isReadyToRender: true,
      isStaticRendering: true,
      ...(await serverSideTranslations(props.locale)),
    },
    // revalidate: false,
  };
};

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
export const getNoneStaticProps: GetStaticProps<SSGPageProps> = async (props): Promise<GetStaticPropsResult<SSGPageProps>> => {
  const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();

  return {
    // Props returned here will be available as page properties (pageProps)
    props: {
      [APOLLO_STATE_PROP_NAME]: getApolloState(apolloClient),
      serializedDataset: serializeSafe({}),
      isReadyToRender: true,
      isStaticRendering: true,
      ...await serverSideTranslations(props.locale, ['common', 'auth']),
    },
    // revalidate: false,
  };
};
