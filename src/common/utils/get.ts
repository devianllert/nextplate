import { GenericObject } from '@/modules/core/data/types/GenericObject';

/**
 * Gets the value at path of object.
 */
export const get = <Data extends GenericObject, Path extends string>(
  object: Data,
  path: Path,
): unknown => {
  let value = object;

  const pathArray = path && typeof path === 'string' ? path.split('.') : [path];

  for (let p = 0; p < pathArray.length; p += 1) {
    value = value ? (value as unknown)[pathArray[p]] : undefined;
  }

  return value;
};
