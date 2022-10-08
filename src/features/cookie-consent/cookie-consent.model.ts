import { createEvent, createStore } from 'effector';
import { persist } from 'effector-storage/local';

export const COOKIE_CONSENT_KEY = 'cookie-consent';

export const cookieAllowed = createEvent();

export const $isCookieAllowed = createStore(false);

persist({ store: $isCookieAllowed, key: COOKIE_CONSENT_KEY });

$isCookieAllowed.on(cookieAllowed, () => true);
