import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { getCoreServerSideProps, GetCoreServerSidePropsResults } from '@/layouts/core/SSR';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { APOLLO_STATE_PROP_NAME, getApolloState } from '@/modules/core/apollo/apolloClient';
import { serializeSafe } from '@/modules/core/serializeSafe/serializeSafe';
import { ApolloQueryResult, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import Head from 'next/head';
import styled from 'styled-components';

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: 100vh;
`;

const PostQuery = gql`
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

const Home: NextPage<Props> = (): JSX.Element => {
  const { data } = useQuery(PostQuery);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>{JSON.stringify(data, null, 2)}</Container>
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
      props: { apolloClient, ...pageData },
    } = commonServerSideProps;
    const queryOptions = {
      // Override query (keep existing variables and headers)
      query: PostQuery,
    };

    const { data, errors }: ApolloQueryResult<any> = await apolloClient.query(queryOptions);

    if (errors) {
      // eslint-disable-next-line no-console
      console.error(errors);
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
        [APOLLO_STATE_PROP_NAME]: getApolloState(apolloClient),
        serializedDataset: serializeSafe(dataset),
      },
    };
  } else {
    return commonServerSideProps;
  }
};

export default Home;