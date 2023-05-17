import { createEvent, sample } from 'effector';

import { sessionQuery } from '@/entities/session';
import { userQuery } from '@/entities/user';

import { $tokenPayload } from '@/shared/api/request';
import { PageContext } from '@/shared/lib/next/types';

import { TokenPayload } from '../../shared/api/api.generated';

export const dashboardPageStarted = createEvent<PageContext>();

sample({
  clock: dashboardPageStarted,
  source: $tokenPayload,
  filter: (payload: TokenPayload | null): payload is TokenPayload => !!payload?.id,
  fn: (payload) => payload.id,
  target: [userQuery.start, sessionQuery.start],
});
