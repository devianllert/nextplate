import { NextApiRequest } from 'next';
import * as Sentry from '@sentry/nextjs';

/**
 * Configure Sentry default scope.
 *
 * Used by both sentry config files (client/server).
 * Doesn't configure Sentry if NEXT_PUBLIC_SENTRY_DSN isn't defined.
 *
 * Automatically applied on the browser, thanks to @sentry/nextjs.
 * Automatically applied on the server, thanks to @sentry/nextjs when "withSentry" HOC is used.
 *
 * @see https://www.npmjs.com/package/@sentry/nextjs
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/usage
 */
export const configureSentry = (): void => {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    // Scope configured by default, subsequent calls to "configureScope" will add additional data
    Sentry.configureScope((scope) => {
      scope.setTag('app.stage', process.env.NEXT_PUBLIC_APP_STAGE);
      scope.setTag('app.name', process.env.NEXT_PUBLIC_APP_NAME);
      scope.setTag('app.url', process.env.NEXT_PUBLIC_APP_URL);
      scope.setTag('app.version', process.env.NEXT_PUBLIC_APP_VERSION);
      scope.setTag('app.build-time', process.env.NEXT_PUBLIC_BUILD_TIME);
    });
  }
};

/**
 * Configure Sentry tags for the currently used lang.
 *
 * @param lang
 * @see https://www.npmjs.com/package/@sentry/node
 */
export const configureSentryI18n = (lang: string): void => {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.configureScope((scope) => {
      scope.setTag('lang', lang);
    });
  }
};

/**
 * Configure the Sentry scope by extracting useful tags and context from the given request.
 *
 * @param req
 * @param tags
 * @param contexts
 * @see https://www.npmjs.com/package/@sentry/nextjs
 */
export const configureReq = (
  req: NextApiRequest,
  tags?: Record<string, string>,
  contexts?: Record<string, Record<string, unknown>>,
): void => {
  Sentry.configureScope((scope) => {
    scope.setTag('host', req?.headers?.host);
    scope.setTag('url', req?.url);
    scope.setTag('method', req?.method);
    scope.setExtra('query', req?.query);
    scope.setExtra('body', req?.body);
    scope.setExtra('cookies', req?.cookies);
    scope.setContext('headers', req?.headers);

    Object.entries(tags ?? {}).forEach(([tag, value]) => {
      scope.setTag(tag, value);
    });

    Object.entries(contexts ?? {}).forEach(([context, value]) => {
      scope.setContext(context, value);
    });
  });
};

export default Sentry;
