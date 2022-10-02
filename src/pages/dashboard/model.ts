import { createEvent, sample } from 'effector';
import { PageContext } from '@/shared/lib/next/types';

import { userQuery } from '@/entities/user';
import { sessionQuery } from '@/entities/session';

export const dashboardPageStarted = createEvent<PageContext>();

sample({
  clock: dashboardPageStarted,
  target: [userQuery.start, sessionQuery.start],
});
