// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = <T extends Function = Function>(
  value: unknown,
): value is T => {
  return typeof value === 'function';
};
