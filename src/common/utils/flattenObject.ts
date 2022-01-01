type Flatten<T extends object> = object extends T ? object : {
  [K in keyof T]-?: (x: NonNullable<T[K]> extends infer V ? V extends object ?
    V extends readonly any[] ? Pick<T, K> : Flatten<V> extends infer FV ? ({
      [P in keyof FV as `${Extract<K, string | number>}.${Extract<P, string | number>}`]:
      FV[P] }) : never : Pick<T, K> : never
  ) => void } extends Record<keyof T, (y: infer O) => void> ?
  O extends infer U ? { [K in keyof O]: O[K] } : never : never;

export const flattenObject = <T extends object>(obj: T): Flatten<T> => {
  const toReturn = {};

  Object.keys(obj).forEach((key) => {
    const item = obj[key];

    if (!(key in obj)) return;

    if ((typeof item) === 'object' && item !== null) {
      const flatObject = flattenObject(item as Record<string, unknown>);

      Object.keys(flatObject).forEach((flattedKey) => {
        if (!(flattedKey in flatObject)) return;

        toReturn[`${key}.${flattedKey}`] = flatObject[flattedKey];
      });
    } else {
      toReturn[key] = item;
    }
  });

  return toReturn as Flatten<T>;
};
