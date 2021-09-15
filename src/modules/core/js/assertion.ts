export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};

export const isEmptyArray = (value: unknown): boolean => {
  return Array.isArray(value) && value.length === 0;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = <T extends Function = Function>(
  value: unknown,
): value is T => {
  return typeof value === 'function';
};

export const isObject = <T = unknown>(value: unknown): value is Record<string, T> => {
  const type = typeof value;
  return (
    value != null
    && (type === 'object' || type === 'function')
    && !Array.isArray(value)
  );
};

export const isEmptyObject = (value: unknown): boolean => {
  return isObject(value) && Object.keys(value).length === 0;
};

export const isEmpty = (value: unknown): boolean => {
  if (Array.isArray(value)) return isEmptyArray(value);
  if (isObject(value)) return isEmptyObject(value);
  if (value == null || value === '') return true;
  return false;
};
