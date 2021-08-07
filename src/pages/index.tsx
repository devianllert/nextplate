import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { getCoreServerSideProps, GetCoreServerSidePropsResults } from '@/layouts/core/SSR';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { serializeSafe } from '@/modules/core/serializeSafe/serializeSafe';
import { createLogger } from '@/modules/core/logging/logger';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';
import { MainLayout } from '@/layouts/main/components/MainLayout';
import { Button } from '@/common/components/system/Button';
import { graphqlRequest } from '@/modules/core/api/graphqlRequest';
import { REACT_QUERY_STATE_PROP_NAME } from '@/modules/core/rquery/react-query';
import { dehydrate } from 'react-query/hydration';
import { getAppTitle } from '@/modules/core/meta/meta';
import { Divider } from '@/common/components/system/Divider';
import { Box } from '@/common/components/system/Box';

const logger = createLogger('Index');

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const PostQuery = `
  query {
    post(id: 1) {
      id
      title
      body
    }
  }
`;

/**
 * Props that are only available for this page
 */
type CustomPageProps = {
  [key: string]: any;
};

type GetServerSidePageProps = CustomPageProps & SSRPageProps;

/**
 * SSR pages are first rendered by the server
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = CustomPageProps & (SSRPageProps & SSGPageProps<OnlyBrowserPageProps>);

const getPosts = () => graphqlRequest(process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT, PostQuery);

const IndexPage: EnhancedNextPage<Props> = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const { data } = useQuery('posts', getPosts);

  return (
    <>
      <Head>
        <title>{getAppTitle('Home')}</title>
      </Head>

      <Container>
        <Link href="/" passHref locale={i18n.language === 'en' ? 'ru' : 'en'}>
          <Button>
            {`${t('button')} ${i18n.language}`}
          </Button>
        </Link>

        <Box width="100%">
          <Divider />
        </Box>

        <Box>
          {JSON.stringify(data, null, 2)}
        </Box>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<GetServerSidePageProps> = async (
  context: GetServerSidePropsContext<CommonServerSideParams>,
): Promise<GetServerSidePropsResult<GetServerSidePageProps>> => {
  const commonServerSideProps: GetServerSidePropsResult<GetCoreServerSidePropsResults> = await getCoreServerSideProps(
    context,
  );

  if ('props' in commonServerSideProps) {
    const {
      props: { queryClient, ...pageData },
    } = commonServerSideProps;

    const { data, errors } = await queryClient.fetchQuery('posts', getPosts);

    if (errors) {
      logger.error(errors);
      throw new Error('Errors were detected in GraphQL query.');
    }

    // const {
    //   customer,
    // } = data ?? {}; // XXX Use empty object as fallback, to avoid app crash when destructuring, if no data is returned
    const dataset = {
      data: data ?? {},
    };

    return {
      // Props returned here will be available as page properties (pageProps)
      props: {
        ...pageData,
        [REACT_QUERY_STATE_PROP_NAME]: dehydrate(queryClient),
        serializedDataset: serializeSafe(dataset),
      },
    };
  } else {
    return commonServerSideProps;
  }
};

IndexPage.Layout = MainLayout;

export default IndexPage;
