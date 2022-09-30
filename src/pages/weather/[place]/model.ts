import { createEvent, sample } from 'effector';
import { PageContext } from '@/shared/lib/next/types';
import { weatherQuery } from '@/entities/weather';

// eslint-disable-next-line @typescript-eslint/ban-types
export const weatherPageStarted = createEvent<PageContext<{}, { place: string }>>();

sample({
  clock: weatherPageStarted,
  fn: (ctx) => ctx.params.place,
  target: weatherQuery.start,
});
