import { GetServerSideProps, GetServerSidePropsResult } from 'next';

import { getTranslationsConfig } from '@/shared/lib/i18n/translations';
import { CommonServerSideParams } from '@/shared/types/common-server-side-params';
import { SSRPageProps } from '@/shared/types/ssr-page-props';

/**
 * getServerSideProps returns only part of the props expected in SSRPageProps
 * To avoid TS issue, we omit those that we don't return, and add those necessary to the getServerSideProps function
 */
export type GetCoreServerSidePropsResults = Omit<SSRPageProps, '__REACT_QUERY_STATE__'>;

/**
 * Returns a "getServerSideProps" function.
 *
 * @param namespaces
 */
export const getCoreServerSideProps = (
  namespaces: string[] = [],
): GetServerSideProps<GetCoreServerSidePropsResults, CommonServerSideParams> => {
  const getServerSideProps: GetServerSideProps<GetCoreServerSidePropsResults, CommonServerSideParams> = async (
    context,
  ): Promise<GetServerSidePropsResult<GetCoreServerSidePropsResults>> => {
    const { req } = context;

    const i18n = await getTranslationsConfig(context, namespaces);

    return {
      props: {
        isServerRendering: true,
        _nextI18Next: i18n._nextI18Next,
      },
    };
  };

  return getServerSideProps;
};
