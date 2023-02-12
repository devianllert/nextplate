import format from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import parseISO from 'date-fns/parseISO';

import { WTTRWeatherDailyCondition, WTTRWeatherHourlyCondition } from '../types/weather.interface';

const HOURLY_WEATHER_INTERVAL = 1000 * 60 * 60 * 3;

const formatHourlyWeather = (
  hourlyWeather: WTTRWeatherHourlyCondition[],
  date: string | Date = new Date(),
): WTTRWeatherHourlyCondition[] => {
  const currentTime = new Date(date).setHours(0, 0, 0);

  const weather = hourlyWeather.map((item, index) => {
    return {
      ...item,
      time: new Date(+currentTime + index * HOURLY_WEATHER_INTERVAL).toISOString(),
    };
  });

  return weather;
};

const formatDailyWeather = (dailyWeather: WTTRWeatherDailyCondition[]): WTTRWeatherDailyCondition[] => {
  return dailyWeather.map((weather) => ({
    ...weather,
    hourly: formatHourlyWeather(weather.hourly, weather.date),
  }));
};

const getFlattenedHourlyWeatherList = (dailyWeather: WTTRWeatherDailyCondition[]): WTTRWeatherHourlyCondition[] => {
  const hourlyWeather = dailyWeather.map((item) => item.hourly).flat();

  return hourlyWeather;
};

export const filterHourlyWeatherBasedOnCurrentTime = (
  dailyWeather: WTTRWeatherDailyCondition[],
): WTTRWeatherHourlyCondition[] => {
  const formattedDailyWeather = formatDailyWeather(dailyWeather);
  const hourlyWeather = getFlattenedHourlyWeatherList(formattedDailyWeather);

  return hourlyWeather.filter((item) => isAfter(typeof item.time === 'string' ? parseISO(item.time) : item.time, Date.now() - HOURLY_WEATHER_INTERVAL));
};

export const formatHourlyTime = (time: string | Date): string => {
  const parsedDate = new Date(time);

  return format(parsedDate, 'hh:mm aa');
};
