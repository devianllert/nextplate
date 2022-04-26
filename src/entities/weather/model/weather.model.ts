import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { fetchWeather } from '../api/wttr';
import { Weather } from '../types/weather.interface';

export const useWeatherQuery = () => {
  const { query } = useRouter();

  const city = query.place as (string | undefined);

  const { data: weather } = useQuery<Weather>(['weather', city], () => fetchWeather(city));

  return {
    city,
    weather,
  };
};

export const useWeatherSearch = () => {
  const router = useRouter();

  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = (new FormData(event.currentTarget).get('search') as string) ?? '';

    if (!text.trim()) return;

    router.push(`/weather/${text}`) as unknown as void;
  };

  return {
    onSearch,
  };
};
