import * as React from 'react';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { serializeSafe } from '@/shared/lib/serialize-safe/serialize-safe';
import { createLogger } from '@/shared/lib/logging/logger';
import * as Text from '@/shared/components/system/text';
import { Box } from '@/shared/components/layout/box';
import { REACT_QUERY_STATE_PROP_NAME } from '@/shared/types/react-query';
import { Container } from '@/shared/components/layout/container';
import { PageSEO } from '@/shared/lib/meta';
import { OnlyBrowserPageProps } from '@/layouts/core/types/only-browser-page-props';
import { SSGPageProps } from '@/layouts/core/types/ssg-page-props';
import { SSRPageProps } from '@/layouts/core/types/ssr-page-props';
import { EnhancedNextPage } from '@/layouts/core/types/enhanced-next-page';
import { getCoreServerSideProps } from '@/layouts/core/ssr';
import { fetchWeather } from '@/modules/weather/api/wttr';
import { Weather } from '@/modules/weather/types/weather.interface';
import { WeatherLayout } from '@/layouts/weather';
import { WeatherDate } from '@/modules/weather/components/weather-date';
import { ICONS_MAP } from '@/modules/weather/constants/icons-map';
import { filterHourlyWeatherBasedOnCurrentTime } from '@/modules/weather/lib/format-hourly-weather';
import { WeatherHourlyList } from '@/modules/weather/components/weather-hourly-list';
import { Todos } from '@/modules/weather/components/todos';

const logger = createLogger('[place]');

/**
 * Props that are only available for this page
 */
type CustomPageProps = Record<string, any>;

type GetServerSidePageProps = CustomPageProps & SSRPageProps;

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
      <PageSEO
        title={`Weather for ${place ?? weather?.place ?? 'your current location'}`}
        description="The right way to check the weather! This is a demo app intended to demonstrate the capabilities of this boilerplate"
        image="/static/images/apps/weather.png"
      />

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

WeatherPlacePage.Layout = WeatherLayout;

export default WeatherPlacePage;
