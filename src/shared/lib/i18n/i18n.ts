import { defaultLocale, supportedLanguages, supportedLocales } from './i18n.config.mjs';

export const SUPPORTED_LOCALES: Record<string, string> = supportedLocales;
export const SUPPORTED_LANGUAGES: string[] = supportedLanguages;

/**
 * Language used by default if no user language can be resolved
 * We use English because it's the most used languages among those supported
 */
export const DEFAULT_LOCALE = defaultLocale;
