import { PublicHeaders } from './PublicHeaders';

/**
 * Props only available on the server side, for all pages
 */
export type OnlyServerPageProps = {
  headers: PublicHeaders; // Headers made public to the client-side
  readonlyCookies: string; // Cookies retrieved using https://www.npmjs.com/package/next-cookies - Aren't really readonly but don't provide any setter
};
