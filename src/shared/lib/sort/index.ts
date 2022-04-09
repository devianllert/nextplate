export type Comparator<T> = (a: T, b: T) => number;

export const compareString: Comparator<string> = (left, right) => {
  if (left < right) return -1;
  if (left > right) return 1;

  return 0;
};

export const compareLength: Comparator<string | Array<unknown>> = (left, right) => left.length - right.length;

export const compareBool: Comparator<boolean> = (left, right) => {
  if (left < right) return -1;
  if (left > right) return 1;

  return 0;
};

export const compareNumber: Comparator<number> = (left: number, right: number): number => left - right;

export const compareReverse = <T>(compare: Comparator<T>) => (left: T, right: T): number => compare(right, left);

/**
 * Compare object field by key.
 */
export const compareField = <T, K extends keyof T>(field: K, compare: Comparator<T[K]>) => (left: T, right: T): number => compare(left[field], right[field]);

/**
 * Combine multiple comparators.
 *
 * @example
 * // first by id, then by salary
 * const compareUser = compareCombine<User>(
 *  compareField('id', compareString),
 *  compareField('salary', compareReverse(compareNumber)),
 * );
 *
 * items.sort(compareUser);
 */
export const compareCombine = <T>(...comparators: Comparator<T>[]) => (left: T, right: T): number => {
  for (let x = 0; x < comparators.length; x += 1) {
    const compare = comparators[x];

    const res = compare(left, right);

    if (res) return res;
  }

  return 0;
};
