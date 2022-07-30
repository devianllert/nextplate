import * as React from 'react';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import Image from 'next/image';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import { serializeSafe } from '@/shared/lib/serialize-safe/serialize-safe';
import { createLogger } from '@/shared/lib/logging/logger';
import * as Text from '@/shared/components/system/text';
import { Box } from '@/shared/components/system/box';
import { REACT_QUERY_STATE_PROP_NAME } from '@/shared/types/react-query';
import { Container } from '@/shared/components/system/container';
import { PageSEO } from '@/shared/lib/meta';
import { OnlyBrowserPageProps } from '@/shared/types/only-browser-page-props';
import { SSGPageProps } from '@/shared/types/ssg-page-props';
import { SSRPageProps } from '@/shared/types/ssr-page-props';
import { EnhancedNextPage } from '@/shared/types/enhanced-next-page';
import { getCoreServerSideProps } from '@/shared/lib/ssr';
import { WeatherLayout } from '@/layouts/weather';
import {
  useWeatherQuery,
  Todos,
  WeatherHourlyList,
  WeatherDate,
  ICONS_MAP,
  fetchWeather,
} from '@/entities/weather';
import { staticPath } from '@/shared/lib/$path';

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
      await queryClient.fetchQuery(['weather', place], () => fetchWeather(place));

      return {
        // Props returned here will be available as page properties (pageProps)
        props: {
          ...pageData,
          [REACT_QUERY_STATE_PROP_NAME]: dehydrate(queryClient),
          serializedDataset: serializeSafe({}),
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
  const {
    city,
    weather,
  } = useWeatherQuery();

  return (
    <>
      <PageSEO
        title={`Weather for ${city ?? weather?.place ?? 'your current location'}`}
        description="The right way to check the weather! This is a demo app intended to demonstrate the capabilities of this boilerplate"
        image={staticPath.static.images.apps.weather_png}
      />

      <Box
        minHeight="100vh"
        display="flex"
        color="text.primary"
        flexDirection="column"
        backgroundImage={`url(${staticPath.static.images.stars_svg}), linear-gradient(180deg, rgba(13,28,139,1) 0%, rgba(83,36,224,1) 65%)`}
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
            </Box>
          </Box>
        </Container>

        <WeatherHourlyList hourlyWeather={weather?.hourly ?? []} />
      </Box>
    </>
  );
};

WeatherPlacePage.Layout = WeatherLayout;

export default WeatherPlacePage;
