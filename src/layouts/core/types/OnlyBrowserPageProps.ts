import UniversalCookiesManager from '@/shared/lib/cookies-manager/universal-cookies-manager';
import { UserSemiPersistentSession } from '@/shared/lib/user-session/types/user-semi-persistent-session';

/**
 * Props only available on the browser side, for all pages
 */
export type OnlyBrowserPageProps = {
  cookiesManager: UniversalCookiesManager;
  iframeReferrer: string;
  isInIframe: boolean;
  userSession: UserSemiPersistentSession; // User session (from browser cookies)
};
