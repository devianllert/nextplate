import { PublicHeaders } from './public-headers';

/**
 * Props only available on the server side, for all pages
 */
export type OnlyServerPageProps = {
  headers: PublicHeaders; // Headers made public to the client-side
};
