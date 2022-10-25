import { createEvent, sample } from 'effector';
import { PageContext } from '@/shared/lib/next/types';

import { userQuery } from '@/entities/user';
import { sessionQuery } from '@/entities/session';
import { $tokenPayload } from '@/shared/api/request';
import { TokenPayload } from '@/entities/auth';

export const dashboardPageStarted = createEvent<PageContext>();

sample({
  clock: dashboardPageStarted,
  source: $tokenPayload,
  filter: (payload: TokenPayload | null): payload is TokenPayload => !!payload?.id,
  fn: (payload) => payload.id,
  target: [userQuery.start, sessionQuery.start],
});
