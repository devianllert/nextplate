import * as React from 'react';

import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import {
  Box, Button, Container, Heading,
} from '@effable/react';
import { allSettled, fork, serialize } from 'effector';
import { useUnit } from 'effector-react/scope';

import { WeatherLayout } from '@/layouts/weather';

import {
  ICONS_MAP, Todos, WeatherDate, WeatherHourlyList, weatherQuery,
} from '@/entities/weather';

import { staticPath } from '@/shared/lib/$path';
import { EFFECTOR_STATE_KEY } from '@/shared/lib/effector/scope';
import { createLogger } from '@/shared/lib/logging/logger';
import { PageSEO } from '@/shared/lib/meta';
import { normalizeSSRContext } from '@/shared/lib/next/context';
import { getCoreServerSideProps } from '@/shared/lib/ssr';
import { EnhancedNextPage } from '@/shared/types/enhanced-next-page';
import { OnlyBrowserPageProps } from '@/shared/types/only-browser-page-props';
import { SSGPageProps } from '@/shared/types/ssg-page-props';
import { SSRPageProps } from '@/shared/types/ssr-page-props';

import { weatherPageStarted } from './model';

const logger = createLogger('[place]');

/**
 * Props that are only available for this page
 */
type CustomPageProps = Record<string, any>;

type GetServerSidePageProps = CustomPageProps & SSRPageProps;

export const getServerSideProps: GetServerSideProps<GetServerSidePageProps> = async (
  context,
): Promise<GetServerSidePropsResult<GetServerSidePageProps>> => {
  const commonServerSideProps = await getCoreServerSideProps()(context);

  const scope = fork();

  if ('props' in commonServerSideProps) {
    const {
      props: { ...pageData },
    } = commonServerSideProps;

    await allSettled(weatherPageStarted, { scope, params: normalizeSSRContext(context) });

    return {
      // Props returned here will be available as page properties (pageProps)
      props: {
        ...pageData,
        [EFFECTOR_STATE_KEY]: serialize(scope),
      },
    };
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
type Props = SSRPageProps & SSGPageProps<OnlyBrowserPageProps>;

const WeatherPlacePage: EnhancedNextPage<Props> = (): JSX.Element => {
  const { data } = useUnit({ data: weatherQuery.$data });

  return (
    <>
      <PageSEO
        title={`Weather for ${data?.place ?? 'unknown location'}`}
        description="The right way to check the weather! This is a demo app intended to demonstrate the capabilities of this boilerplate"
        image={staticPath.static.images.apps.weather_png}
      />

      <Box
        minHeight="100vh"
        display="flex"
        color="primary"
        flexDirection="column"
        backgroundImage={`url(${staticPath.static.images.stars_svg}), linear-gradient(180deg, rgba(13,28,139,1) 0%, rgba(83,36,224,1) 65%)`}
        backgroundRepeat="repeat no-repeat"
        backgroundPosition="center top"
        py={[5, null, 8]}
        px={[0, null, 8]}
        justifyContent={!data ? 'center' : undefined}
      >
        <Container>
          {!data && (
            <Box display="flex" alignItems="center" flexDirection="column">
              <Heading variant="h4" component="h1">
                Unknown location
              </Heading>

              <Button component="a" href="/weather" color="neutral">
                Back to search
              </Button>
            </Box>
          )}

          {data && (
            <Box
              display="flex"
              flexDirection={['column-reverse', null, 'row']}
              justifyContent={[null, null, 'space-between']}
              mb={[4, null, 0]}
            >
              <Box display="flex" flexDirection="column">
                <WeatherDate />

                <Box mt={5}>
                  <Todos />
                </Box>
              </Box>

              <Box display="flex" flexDirection="column" alignItems={['center', null, 'flex-end']} mb={[4, null, 0]}>
                <Image
                  width="112"
                  height="112"
                  src={`/static/images/weather/wi-${ICONS_MAP[data?.condition.code ?? '113']}.svg`}
                  alt={data?.condition.title}
                />
                <Heading variant="h3" component="span">
                  {data?.condition.title}
                </Heading>
                <Heading variant="h6" component="span" sx={{ mt: 2 }} color="text.secondary">
                  {data?.place}
                </Heading>
                <Heading variant="h3" component="span" sx={{ mt: 4 }}>
                  {data?.temp.c} °
                </Heading>
              </Box>
            </Box>
          )}
        </Container>

        {data && <WeatherHourlyList hourlyWeather={data?.hourly ?? []} />}
      </Box>
    </>
  );
};

WeatherPlacePage.Layout = WeatherLayout;

export default WeatherPlacePage;
