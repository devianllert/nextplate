import { isEmpty } from '@effable/misc';
import { createQuery } from '@farfetched/core';
import { createEvent, createStore, sample } from 'effector';

import { pagesPath } from '@/shared/lib/$path';
import { pushFx } from '@/shared/lib/effector/router';

import { fetchWeather } from '../api/wttr';

export const weatherQuery = createQuery({
  handler: async (city: string) => fetchWeather(city),
  name: 'weather',
});

export const inputChanged = createEvent<string>();
export const searchClicked = createEvent();

export const $search = createStore('');
$search.on(inputChanged, (_, text) => text);

sample({
  clock: searchClicked,
  source: $search,
  filter: (text) => !isEmpty(text),
  fn: (text) => ({ url: pagesPath.weather._place(text).$url() }),
  target: pushFx,
});
