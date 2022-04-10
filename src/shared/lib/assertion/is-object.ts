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
