import * as React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { pagesPath } from '@/shared/lib/$path';

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
  const [text, setText] = React.useState('');
  const router = useRouter();

  const onSearch = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!text.trim()) return;

    router.push(pagesPath.weather._place(text).$url()) as unknown as void;
  };

  return {
    onSearch,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value),
  };
};
