import UniversalCookiesManager from '@/shared/lib/cookiesManager/UniversalCookiesManager';
import { UserSemiPersistentSession } from '@/shared/lib/userSession/types/UserSemiPersistentSession';

/**
 * Props only available on the browser side, for all pages
 */
export type OnlyBrowserPageProps = {
  cookiesManager: UniversalCookiesManager;
  iframeReferrer: string;
  isInIframe: boolean;
  userSession: UserSemiPersistentSession; // User session (from browser cookies)
};
