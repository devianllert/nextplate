import { NextApiRequest } from 'next';
import * as Sentry from '@sentry/nextjs';

import isBrowser from '@/common/utils/isBrowser';

import { UserSession } from '../userSession/useUserSession';
import { GenericObject } from '../data/types/GenericObject';
import { convertRequestBodyToJSObject } from '../api/convertRequestBodyToJSObject';
import { createLogger } from '../logging/logger';

const logger = createLogger('modules/sentry/sentry.ts');

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
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN && process.env.NODE_ENV !== 'test') {
    logger.warn('Sentry DSN not defined, Sentry won\'t be configured and there won\'t be any error reporting.');
  }

  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    logger.log('Sentry initialized');

    // Scope configured by default, subsequent calls to "configureScope" will add additional data
    Sentry.configureScope((scope) => {
      scope.setTag('customerRef', process.env.NEXT_PUBLIC_CUSTOMER_REF);
      scope.setTag('appStage', process.env.NEXT_PUBLIC_APP_STAGE);
      scope.setTag('appName', process.env.NEXT_PUBLIC_APP_NAME);
      scope.setTag('appBaseUrl', process.env.NEXT_PUBLIC_APP_BASE_URL);
      scope.setTag('appVersion', process.env.NEXT_PUBLIC_APP_VERSION);
      scope.setTag('appNameVersion', process.env.NEXT_PUBLIC_APP_NAME_VERSION);
      scope.setTag('appBuildTime', process.env.NEXT_PUBLIC_APP_BUILD_TIME);
      scope.setTag('buildTimeISO', (new Date(process.env.NEXT_PUBLIC_APP_BUILD_TIME)).toISOString());
      scope.setTag('appBuildId', process.env.NEXT_PUBLIC_APP_BUILD_ID);
      scope.setTag('nodejs', process.version);
      scope.setTag('nodejsAWS', process.env.AWS_EXECUTION_ENV || null); // Optional - Available on production environment only
      scope.setTag('memory', process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE || null); // Optional - Available on production environment only
      scope.setTag('runtimeEngine', isBrowser() ? 'browser' : 'server');
    });
  }
};

/**
 * Configure Sentry tags for the current user.
 *
 * Allows to track all Sentry events related to a particular user.
 * The tracking remains anonymous, there are no personal information being tracked, only internal ids.
 *
 * @param userSession
 * @see https://www.npmjs.com/package/@sentry/node
 */
export const configureSentryUser = (userSession: UserSession): void => {
  if (process.env.SENTRY_DSN) {
    Sentry.configureScope((scope) => {
      scope.setTag('userId', userSession?.id);
      scope.setTag('userDeviceId', userSession?.deviceId);
      scope.setContext('user', userSession);
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
  if (process.env.SENTRY_DSN) {
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
export const configureReq = (req: NextApiRequest, tags?: Record<string, string>, contexts?: Record<string, Record<string, unknown>>): void => {
  let parsedBody: GenericObject = {};
  try {
    parsedBody = convertRequestBodyToJSObject(req);
  } catch (e) {
    // eslint-disable-next-line no-console
    // console.error(e);
  } // Do nothing, as "body" is not necessarily supposed to contain valid stringified JSON

  Sentry.configureScope((scope) => {
    scope.setTag('host', req?.headers?.host);
    scope.setTag('url', req?.url);
    scope.setTag('method', req?.method);
    scope.setExtra('query', req?.query);
    scope.setExtra('body', req?.body);
    scope.setExtra('cookies', req?.cookies);
    scope.setContext('headers', req?.headers);
    scope.setContext('parsedBody', parsedBody);

    Object.entries(tags ?? {}).forEach(([tag, value]) => {
      scope.setTag(tag, value);
    });

    Object.entries(contexts ?? {}).forEach(([context, value]) => {
      scope.setContext(context, value);
    });
  });
};

export default Sentry;
