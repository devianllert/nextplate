import { isBrowser } from '@effable/misc';
import * as Sentry from '@sentry/nextjs';
import StringifySafe from 'json-stringify-safe';

import { GenericObject } from '../../types/generic-object';

/**
 * Converts a JSON object into a string that is url-friendly.
 *
 * @example encodeJSONToQueryParameter({ a: 1}) > '%7B%22a%22%3A1%7D'
 *
 * @param {object} data
 * @return {string}
 */
export const encodeJSONToQueryParameter = (data: GenericObject): string => {
  return encodeURIComponent(StringifySafe(data)); // Use StringifySafe to avoid crash on circular dependencies
};

/**
 * Converts a string into a JSON object.
 *
 * If the parsing fails, returns an empty object instead and log the error to Sentry.
 *
 * @example decodeQueryParameterToJSON('%7B%22a%22%3A1%7D') > {a: 1}
 *
 * @param {string} query
 * @return {object}
 */
export const decodeQueryParameterToJSON = (query: string): GenericObject => {
  let decodedQueryParameter: string; // Will contain a JSON object, as string

  try {
    // Decoding might fail (e.g "URI malformed")
    decodedQueryParameter = decodeURIComponent(query);
  } catch (e) {
    Sentry.captureException(e);
    // eslint-disable-next-line no-console
    console.error(e);

    // If decoding failed, default to empty object (as string)
    decodedQueryParameter = '{}';
  }

  // Parsing the query parameter could fail for various reason, the most expected use case being a bad/truncated/malformed URL
  try {
    return JSON.parse(decodedQueryParameter) as GenericObject;
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setExtra('decodedQueryParameter', decodedQueryParameter); // Useful for debug
      Sentry.captureException(error);
    });

    // Return an empty object, we consider there was no data
    return {};
  }
};

/**
 * Meant to be used to avoid redirecting to external websites
 * This is a security control to avoid external attackers using our own internal redirects for their own purposes (avoid make believe the redirection is legit)
 *
 * If the url is an external url, then use the fallback value
 * A url is considered external and absolute if it starts with "//", or if it doesn't start with "/"
 *
 * @example filterExternalAbsoluteUrl('https://google.com') => /
 * @example filterExternalAbsoluteUrl('http://google.com') => /
 * @example filterExternalAbsoluteUrl('//google.com') => /
 * @example filterExternalAbsoluteUrl('/google.com') => /google.com
 *
 * @param url
 * @param fallbackValue
 */
export const filterExternalAbsoluteUrl = (url: string, fallbackValue = '/'): string => {
  if (typeof url !== 'string' || url.startsWith('//') || !url.startsWith('/')) {
    return fallbackValue;
  } else {
    return url;
  }
};

/**
 * Extract a parameter from a given url.
 * If no url is given, use the current url (if running in browser).
 *
 * @param parameter
 * @param url
 */
export const getParamFromUrl = (parameter: string, url: string): string | null => {
  const urlAsString = !url && isBrowser() ? window.location.href : url;

  const parsedUrl = new URL(urlAsString);

  return parsedUrl.searchParams.get(parameter);
};
