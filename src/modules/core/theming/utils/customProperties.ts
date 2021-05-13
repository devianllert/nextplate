export const toVarName = (key: string): string => `--theme-ui-${key.replace('-__default', '')}`;

export const toVarValue = (key: string): string => `var(${toVarName(key)})`;

const join = (...args: (string | undefined)[]) => args.filter(Boolean).join('-');

const reservedKeys = {
  useCustomProperties: true,
  initialColorModeName: true,
  printColorModeName: true,
  initialColorMode: true,
  useLocalStorage: true,
};

export const toCustomProperties = <T>(
  obj: T,
  parent?: string,
): T => {
  const next = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const name = join(parent, key);

    if (value && typeof value === 'object') {
      next[key] = toCustomProperties(value, name);

      return;
    }

    if (reservedKeys[key as keyof typeof reservedKeys]) {
      next[key] = value;

      return;
    }

    next[key] = toVarValue(name);
  });

  return next as T;
};
