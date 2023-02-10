import * as React from 'react';
import Image from 'next/image';
import {
  Box, Container, DisplayOnBrowserMount, Heading,
} from '@effable/react';

import { ICONS_MAP } from '../constants/icons-map';
import { formatHourlyTime } from '../lib/format-hourly-weather';
import { WTTRWeatherHourlyCondition } from '../types/weather.interface';

export interface WeatherHourlyListProps {
  hourlyWeather: WTTRWeatherHourlyCondition[];
}

export const WeatherHourlyList = (props: WeatherHourlyListProps): JSX.Element => {
  const { hourlyWeather } = props;

  return (
    <Box
      component={Container}
      display="flex"
      marginTop="auto"
      justifyContent={[null, null, null, 'center']}
      overflowX="auto"
      px={[0, null]}
    >
      <DisplayOnBrowserMount>
        {hourlyWeather.map((item, index) => (
          <Box
            key={item.time}
            display="flex"
            flexDirection="column"
            alignItems="center"
            minWidth={[140, null, 160]}
            px={[2, null, 4]}
            py={2}
          >
            <Heading variant="h6" component="span">
              {index === 0 ? 'Now' : formatHourlyTime(item.time)}
            </Heading>
            <Image
              width="64"
              height="64"
              src={`/static/images/weather/wi-${ICONS_MAP[item.weatherCode]}.svg`}
              alt={item.weatherCode}
            />

            <Heading variant="h6" component="span">
              {item.tempC} °
            </Heading>
          </Box>
        ))}
      </DisplayOnBrowserMount>
    </Box>
  );
};
