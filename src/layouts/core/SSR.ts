import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import NextCookies from 'next-cookies';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { IncomingMessage } from 'http';
import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import UniversalCookiesManager from '@/modules/core/cookiesManager/UniversalCookiesManager';
import { UserSemiPersistentSession } from '@/modules/core/userSession/types/UserSemiPersistentSession';
import { initializeApollo } from '@/modules/core/apollo/apolloClient';
import { Cookies } from '@/modules/core/cookiesManager/types/Cookies';
import { PublicHeaders } from './types/PublicHeaders';
import { SSRPageProps } from './types/SSRPageProps';

/**
 * getDemoServerSideProps returns only part of the props expected in SSRPageProps
 * To avoid TS issue, we omit those that we don't return, and add those necessary to the getServerSideProps function
 */
export type GetCoreServerSidePropsResults = Omit<SSRPageProps, '__APOLLO_STATE__'> & {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  headers: PublicHeaders;
};

/**
 * Only executed on the server side, for every request.
 * Computes some dynamic props that should be available for all SSR pages that use getServerSideProps
 *
 * Because the exact GQL query will depend on the consumer (AKA "caller"), this helper doesn't run any query by itself, but rather return all necessary props to allow the consumer to perform its own queries
 * This improves performances, by only running one GQL query instead of many (consumer's choice)
 *
 * Meant to avoid code duplication
 *
 * XXX Core component, meant to be used by other layouts, shouldn't be used by other components directly.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 */
export const getCoreServerSideProps: GetServerSideProps<GetCoreServerSidePropsResults, CommonServerSideParams> = async (context: GetServerSidePropsContext<CommonServerSideParams>): Promise<GetServerSidePropsResult<GetCoreServerSidePropsResults>> => {
  const {
    req,
    res,
    locale,
  } = context;

  // Parses Next.js cookies in a universal way (server + client)
  const readonlyCookies: Cookies = NextCookies(context);
  // Cannot be forwarded as pageProps, because contains circular refs
  const cookiesManager: UniversalCookiesManager = new UniversalCookiesManager(req, res);
  const userSession: UserSemiPersistentSession = cookiesManager.getUserData();
  const { headers }: IncomingMessage = req;
  const publicHeaders: PublicHeaders = {
    'accept-language': headers?.['accept-language'],
    'user-agent': headers?.['user-agent'],
    host: headers?.host,
  };
  const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();

  return {
    props: {
      apolloClient,
      // We don't send the dataset yet (we don't have any because we haven't fetched the database yet), but it must be done by SSR pages in"getServerSideProps"
      serializedDataset: null,
      userSession,
      isReadyToRender: true,
      isServerRendering: true,
      readonlyCookies,
      headers: publicHeaders,
      ...await serverSideTranslations(locale, ['common']),
    },
  };
};
