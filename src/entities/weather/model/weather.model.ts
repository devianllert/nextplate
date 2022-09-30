import * as React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import { createEvent, createStore, sample } from 'effector';
import { createQuery } from '@farfetched/core';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { pagesPath } from '@/shared/lib/$path';

import { fetchWeather } from '../api/wttr';
import { Weather } from '../types/weather.interface';
import { pushFx } from '@/shared/lib/effector/router';
import { isEmpty } from '@/shared/lib/assertion';

export const useWeatherQuery = () => {
  const { query } = useRouter();

  const city = query.place as (string | undefined);

  const { data: weather } = useQuery<Weather>(['weather', city], () => fetchWeather(city));

  return {
    city,
    weather,
  };
};

export const weatherQuery = createQuery({
  handler: async (city: string) => fetchWeather(city),
});

export const inputChanged = createEvent<string>();
export const searchClicked = createEvent();

export const $search = createStore('');
$search.on(inputChanged, (_, text) => text);

export const $currentCity = createStore('');

sample({
  clock: searchClicked,
  source: $search,
  filter: (text) => !isEmpty(text),
  target: $currentCity,
});

sample({
  clock: searchClicked,
  source: $search,
  filter: (text) => !isEmpty(text),
  fn: (text) => ({ url: pagesPath.weather._place(text).$url() }),
  target: pushFx,
});
