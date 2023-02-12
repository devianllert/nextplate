import { Cookies } from '@/shared/lib/cookies-manager/types/cookies';
import { UserSemiPersistentSession } from '@/shared/lib/user-session/types/user-semi-persistent-session';

import { PublicHeaders } from './public-headers';

/**
 * Props only available on the server side, for all pages
 */
export type OnlyServerPageProps = {
  headers: PublicHeaders; // Headers made public to the client-side
  readonlyCookies: Cookies; // Cookies retrieved using https://www.npmjs.com/package/next-cookies - Aren't really readonly but don't provide any setter
  userSession: UserSemiPersistentSession; // User session (from server cookies)
};
