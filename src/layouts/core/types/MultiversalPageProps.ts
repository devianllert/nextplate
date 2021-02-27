/**
 * Page properties available on all pages, whether they're rendered statically, dynamically, from the server or the client
 *
 * Multiversal page props are listed in MultiversalPageProps
 * Server-side page props are listed in SSRPageProps
 * Client-side page props are listed in SSGPageProps
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type MultiversalPageProps<E extends {} = {}> = {
  isReadyToRender: boolean;
  error?: Error; // Only defined if there was an error
  statusCode?: number; // Provided by Next.js framework, sometimes
} & E;
