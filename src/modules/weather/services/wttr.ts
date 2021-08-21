import { api } from '@/modules/core/api/api';

import { Weather, WTTRWeather } from '../types/weather.interface';

const WEATHER_API_ENDPOINT = 'https://wttr.in';

export const fetchWeather = async (place = ''): Promise<Weather> => {
  const { data } = await api.get<WTTRWeather>(`${WEATHER_API_ENDPOINT}/${encodeURIComponent(place)}?format=j1`);

  const weather: Weather = {
    place: `${data.nearest_area[0].region[0].value}, ${data.nearest_area[0].country[0].value}`,
    condition: {
      title: data.current_condition[0].weatherDesc[0].value,
      code: data.current_condition[0].weatherCode,
    },
    temp: {
      c: data.current_condition[0].temp_C,
      f: data.current_condition[0].temp_F,
    },
    date: {
      time: data.current_condition[0].observation_time,
      date: data.current_condition[0].localObsDateTime,
    },
    daily: data.weather,
  };

  return weather;
};
