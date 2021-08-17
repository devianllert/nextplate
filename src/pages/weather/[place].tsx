import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { serializeSafe } from '@/modules/core/serializeSafe/serializeSafe';
import { getAppTitle } from '@/modules/core/meta/meta';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { createLogger } from '@/modules/core/logging/logger';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';
import { Button } from '@/common/components/system/Button';
import { Typography } from '@/common/components/system/Typography';
import { Box } from '@/common/components/system/Box';
import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { GetCoreServerSidePropsResults, getCoreServerSideProps } from '@/layouts/core/SSR';
import { REACT_QUERY_STATE_PROP_NAME } from '@/modules/core/rquery/react-query';
import { range } from '@/common/utils/range';
import { fetchWeather, Weather } from '@/modules/weather/services/wttr';
import { WeatherLayout } from '@/layouts/weather/components/WeatherLayout';
import { WeatherDate } from '@/modules/weather/components/WeatherDate';

const logger = createLogger('[place]');

/**
 * Props that are only available for this page
 */
type CustomPageProps = Record<string, any>;

type GetServerSidePageProps = CustomPageProps & SSRPageProps;

/**
 * SSR pages are first rendered by the server
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = (SSRPageProps & SSGPageProps<OnlyBrowserPageProps>);

const WeatherPlacePage: EnhancedNextPage<Props> = (): JSX.Element => {
  const { query } = useRouter();
  const place = query.place as (string | undefined);

  const { data: weather, error, isFetching } = useQuery<Weather>(['weather', place], () => fetchWeather(place));

  return (
    <>
      <Head>
        <title>{getAppTitle(`Weather for ${place ?? weather?.place ?? 'your current location'}`)}</title>
      </Head>

      <Box
        minHeight="100vh"
        display="flex"
        color="text"
        flexDirection="column"
        background="linear-gradient(180deg, rgba(13,28,139,1) 0%, rgba(83,36,224,1) 65%)"
        p={8}
      >
        <Box
          display="flex"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <WeatherDate />

            <Box mt={5}>
              <Button color="inherit">Next</Button>

              <Box mt={3}>
                <Box mb={3}>
                  <Typography variant="subtitle1" component="span" mr={2}>16:30h</Typography>

                  <Typography variant="body1" component="span" fontWeight="bold">Stay at Bohem Art Hotel</Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" component="span" mr={2}>16:30h</Typography>

                  <Typography variant="body1" component="span" fontWeight="bold">Stay at Bohem Art Hotel</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
          >
            <Typography variant="h3" component="span" fontWeight="medium">{weather?.condition.title}</Typography>
            <Typography variant="h6" component="span" mt={2} fontWeight="normal" color="secondary">{weather?.place}</Typography>
            <Typography variant="h3" component="span" mt={4} fontWeight="bold">{weather?.temp.c} °</Typography>
            {isFetching && 'Updating'}
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          mt="auto"
        >
          {range(7).map((key) => (
            <Box
              key={key}
              display="flex"
              flexDirection="column"
              alignItems="center"
              minWidth="160px"
              px={4}
              py={2}
            >
              <Typography variant="h6" component="span">Today</Typography>
              <Typography variant="h6" component="span">21</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<GetServerSidePageProps> = async (
  context: GetServerSidePropsContext<CommonServerSideParams>,
): Promise<GetServerSidePropsResult<GetServerSidePageProps>> => {
  const commonServerSideProps: GetServerSidePropsResult<GetCoreServerSidePropsResults> = await getCoreServerSideProps(
    context,
  );

  const place = context.query.place as (string | undefined);

  if ('props' in commonServerSideProps) {
    const {
      props: { queryClient, ...pageData },
    } = commonServerSideProps;

    try {
      const data = await queryClient.fetchQuery(['weather', place], () => fetchWeather(place));

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
    } catch (error) {
      logger.error(error);
      throw new Error('Errors were detected in query.');
    }
  } else {
    return commonServerSideProps;
  }
};

WeatherPlacePage.Layout = WeatherLayout;

export default WeatherPlacePage;
