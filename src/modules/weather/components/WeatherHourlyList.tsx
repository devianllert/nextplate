import * as React from 'react';
import Image from 'next/image';

import { Box } from '@/common/components/system/Box';
import { Typography } from '@/common/components/system/Typography';
import { Container } from '@/common/components/system/Container';

import { ICONS_MAP } from '../constants/iconsMap';
import { formatHourlyTime } from '../formatHourlyWeather';
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
      justifyContent={[null, null, null, 'center']}
      overflowX="auto"
      mt="auto"
    >
      {hourlyWeather.map((item, index) => (
        <Box
          key={item.time.toString()}
          display="flex"
          flexDirection="column"
          alignItems="center"
          minWidth="160px"
          px={4}
          py={2}
        >
          <Typography variant="h6" component="span">{index === 0 ? 'Now' : formatHourlyTime(item.time)}</Typography>
          <Image width="64" height="64" src={`/static/images/weather/wi-${ICONS_MAP[item.weatherCode]}.svg`} alt={item.weatherCode} />

          <Typography variant="h6" component="span">{item.tempC} °</Typography>
        </Box>
      ))}
    </Box>
  );
};
