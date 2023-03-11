import { createEvent, sample } from 'effector';

import { weatherQuery } from '@/entities/weather';

import { PageContext } from '@/shared/lib/next/types';

// eslint-disable-next-line @typescript-eslint/ban-types
export const weatherPageStarted = createEvent<PageContext<{}, { place: string }>>();

sample({
  clock: weatherPageStarted,
  fn: (ctx) => ctx.params.place,
  target: weatherQuery.start,
});
