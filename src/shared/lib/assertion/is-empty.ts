import { isEmptyArray } from './is-empty-array';
import { isObject, isEmptyObject } from './is-object';

export const isEmpty = (value: unknown): boolean => {
  if (Array.isArray(value)) return isEmptyArray(value);
  if (isObject(value)) return isEmptyObject(value);
  if (value == null || value === '') return true;

  return false;
};
