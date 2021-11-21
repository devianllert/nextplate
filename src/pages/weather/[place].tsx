import * as React from 'react';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { serializeSafe } from '@/modules/core/serializeSafe/serializeSafe';
import { getAppTitle } from '@/modules/core/meta/meta';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { createLogger } from '@/modules/core/logging/logger';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';
import * as Text from '@/common/components/system/Text';
import { Box } from '@/common/components/system/Box';
import { getCoreServerSideProps } from '@/layouts/core/SSR';
import { REACT_QUERY_STATE_PROP_NAME } from '@/modules/core/rquery/react-query';
import { fetchWeather } from '@/modules/weather/services/wttr';
import { Weather } from '@/modules/weather/types/weather.interface';
import { WeatherLayout } from '@/layouts/weather/components/WeatherLayout';
import { WeatherDate } from '@/modules/weather/components/WeatherDate';
import { ICONS_MAP } from '@/modules/weather/constants/iconsMap';
import { filterHourlyWeatherBasedOnCurrentTime } from '@/modules/weather/formatHourlyWeather';
import { WeatherHourlyList } from '@/modules/weather/components/WeatherHourlyList';
import { Container } from '@/common/components/system/Container';
import { Todos } from '@/modules/weather/components/Todos';

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
  const { data: weather, isFetching } = useQuery<Weather>(['weather', place], () => fetchWeather(place));

  const hourlyWeather = filterHourlyWeatherBasedOnCurrentTime(weather?.daily ?? []).slice(0, 8);

  return (
    <>
      <Head>
        <title>{getAppTitle(`Weather for ${place ?? weather?.place ?? 'your current location'}`)}</title>
      </Head>

      <Box
        minHeight="100vh"
        display="flex"
        color="text.primary"
        flexDirection="column"
        backgroundImage="url('/static/images/stars.svg'), linear-gradient(180deg, rgba(13,28,139,1) 0%, rgba(83,36,224,1) 65%)"
        backgroundRepeat="repeat no-repeat"
        backgroundPosition="center top"
        py={[5, null, 8]}
        px={[0, null, 8]}
      >
        <Container>
          <Box
            display="flex"
            flexDirection={['column-reverse', null, 'row']}
            justifyContent={[null, null, 'space-between']}
            mb={[4, null, 0]}
          >
            <Box
              display="flex"
              flexDirection="column"
            >
              <WeatherDate />

              <Box mt={5}>
                <Todos />
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              alignItems={['center', null, 'flex-end']}
              mb={[4, null, 0]}
            >
              <Image width="112" height="112" src={`/static/images/weather/wi-${ICONS_MAP[weather?.condition.code ?? '113']}.svg`} alt={weather?.condition.title} />
              <Text.Heading variant="h3" component="span" fontWeight="medium" textAlign="center">{weather?.condition.title}</Text.Heading>
              <Text.Heading variant="h6" component="span" sx={{ mt: 2 }} fontWeight="normal" color="text.secondary">{weather?.place}</Text.Heading>
              <Text.Heading variant="h3" component="span" sx={{ mt: 4 }} fontWeight="bold">{weather?.temp.c} °</Text.Heading>
              {isFetching && 'Updating'}
            </Box>
          </Box>
        </Container>

        <WeatherHourlyList hourlyWeather={hourlyWeather} />
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<GetServerSidePageProps> = async (
  context,
): Promise<GetServerSidePropsResult<GetServerSidePageProps>> => {
  context.res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=600');

  const commonServerSideProps = await getCoreServerSideProps()(context);

  const place = context.query.place as (string | undefined);

  const queryClient = new QueryClient();

  if ('props' in commonServerSideProps) {
    const {
      props: { ...pageData },
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
