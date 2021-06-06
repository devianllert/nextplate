import { NextApiRequest } from 'next';
import * as Sentry from '@sentry/nextjs';
import map from 'lodash.map';

import isBrowser from '@/common/utils/isBrowser';

import { UserSession } from '../userSession/useUserSession';
import { GenericObject } from '../data/types/GenericObject';
import { convertRequestBodyToJSObject } from '../api/convertRequestBodyToJSObject';

// Scope configured by default, subsequent calls to "configureScope" will add additional data
// See https://www.npmjs.com/package/@sentry/node
Sentry.configureScope((scope) => {
  scope.setTag('appStage', process.env.NEXT_PUBLIC_APP_STAGE);
  scope.setTag('appName', process.env.NEXT_PUBLIC_APP_NAME);
  scope.setTag('appBaseUrl', process.env.NEXT_PUBLIC_APP_BASE_URL);
  scope.setTag('appVersion', process.env.NEXT_PUBLIC_APP_VERSION);
  scope.setTag('appNameVersion', process.env.NEXT_PUBLIC_APP_NAME_VERSION);
  scope.setTag('appBuildTime', process.env.NEXT_PUBLIC_APP_BUILD_TIME);
  scope.setTag('buildTimeISO', (new Date(process.env.NEXT_PUBLIC_APP_BUILD_TIME || null)).toISOString());
  scope.setTag('appBuildId', process.env.NEXT_PUBLIC_APP_BUILD_ID);
  scope.setTag('nodejs', process.version);
  scope.setTag('runtimeEngine', isBrowser() ? 'browser' : 'server');
});

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
export const configureReq = (req: NextApiRequest, tags?: { [key: string]: string }, contexts?: { [key: string]: any }): void => {
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

    map(tags, (value: string, tag: string) => {
      scope.setTag(tag, value);
    });

    map(contexts, (value: { [key: string]: any; }, context: string) => {
      scope.setContext(context, value);
    });
  });
};

export default Sentry;
