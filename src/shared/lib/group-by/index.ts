/**
 * Groups the elements of an array based on the given function.
 */
export const groupBy = <T extends Record<string, any> = Record<string, any>>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce(
    (objectsByKeyValue, obj) => ({
      ...objectsByKeyValue,
      [obj[key]]: (objectsByKeyValue[obj[key] as string] || []).concat(obj),
    }),
    {},
  );
};
