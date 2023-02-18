/**
 * Gets the value at path of object.
 */
export const get = (object: Record<string, unknown> | any[], path: string | number): unknown => {
  let value = object;

  const pathArray: (string | number)[] = typeof path === 'string' ? path.split('.') : [path];

  for (let p = 0; p < pathArray.length; p += 1) {
    value = value ? value[pathArray[p]] : undefined;
  }

  return value;
};
