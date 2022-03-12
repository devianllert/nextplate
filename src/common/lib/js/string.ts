import { isObject } from './assertion';
import { GenericObject } from '../data/types/GenericObject';

/**
 * Replace all occurrences in a string.
 *
 * Meant to be used with string that contain "dynamic" data, such as "Hello {name}",
 * where "name" is meant to be a variable
 *
 * @example replaceAllOccurrences('Hello {name}', { name: 'Unly' }) => "Hello Unly"
 */
export const replaceAllOccurrences = (
  initialString: string,
  variables: GenericObject<string>,
  prefix = '{',
  suffix = '}',
): string => {
  if (
    typeof initialString === 'string'
    && initialString.length
    && isObject(variables)
    && Object.keys(variables).length
  ) {
    let replacedString = initialString;

    // For each key to replace, replace it by its matching value, in the initial string
    Object.entries(variables).forEach(([key, replacement]) => {
      const needle = `${prefix}${key}${suffix}`;
      const re = new RegExp(needle, 'gi');

      replacedString = replacedString.replace(re, replacement);
    });

    return replacedString;
  }

  return initialString;
};

/**
 * Remove the trailing slash of a string
 *
 * Useful for urls, in particular
 *
 * @param string
 */
export const removeTrailingSlash = (string: string): string => {
  if (string[string.length - 1] === '/') {
    return string.slice(0, -1);
  }

  return string;
};

export const snakeToCamel = (str: string): string => str.replace(/(_\w)/g, (group) => group[1].toUpperCase());

export const kebabToCamel = (str: string): string => str.replace(/(-\w)/g, (group) => group[1].toUpperCase());

export const camelToSnake = (str: string): string => str.replace(/[\w]([A-Z])/g, (group) => `${group[0]}_${group[1]}`).toLowerCase();

export const camelToKebab = (str: string): string => str.replace(/[\w]([A-Z])/g, (group) => `${group[0]}-${group[1]}`).toLowerCase();

export const uncapitalize = (str: string): string => str.charAt(0).toLowerCase() + str.slice(1);

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
