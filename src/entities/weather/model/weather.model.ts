import { createEvent, createStore, sample } from 'effector';
import { createQuery } from '@farfetched/core';
import { pagesPath } from '@/shared/lib/$path';

import { fetchWeather } from '../api/wttr';
import { pushFx } from '@/shared/lib/effector/router';
import { isEmpty } from '@/shared/lib/assertion';

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
