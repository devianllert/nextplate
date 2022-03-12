/**
 * Finds the previous item of the current item, in an array of items.
 *
 * @param {T} currentItem
 * @param {T[]} items
 * @return {T}
 */
export const findPreviousItem = <T>(currentItem: T, items: T[]): T | null => {
  if (!Array.isArray(items) || !currentItem) {
    return null;
  }

  const currentItemIndex = items.indexOf(currentItem);
  let previousItemIndex = currentItemIndex - 1;

  if (previousItemIndex < 0) {
    // Handles array overflow
    previousItemIndex = items.length - 1;
  }

  return items[previousItemIndex];
};

/**
 * Finds the previous item of the current item, in an array of items.
 *
 * @param {T} currentItem
 * @param {T[]} items
 * @return {T}
 */
export const findNextItem = <T>(currentItem: T, items: T[]): T | null => {
  if (!Array.isArray(items) || !currentItem) {
    return null;
  }

  const currentItemIndex = items.indexOf(currentItem);
  let nextItemIndex = currentItemIndex + 1;

  if (nextItemIndex >= items.length) {
    // Handles array overflow
    nextItemIndex = 0;
  }

  return items[nextItemIndex];
};

export const getFirstItem = <T>(array: T[]): T | undefined => {
  return array != null && array.length ? array[0] : undefined;
};

export const getLastItem = <T>(array: T[]): T | undefined => {
  const length = array == null ? 0 : array.length;

  return length ? array[length - 1] : undefined;
};

/**
 * Get the next index based on the current index and step.
 *
 * @param currentIndex the current index
 * @param length the total length or count of items
 * @param step the number of steps
 * @param loop whether to circle back once `currentIndex` is at the start/end
 */
export const getNextIndex = (
  currentIndex: number,
  length: number,
  step = 1,
  loop = true,
): number => {
  const lastIndex = length - 1;

  if (currentIndex === -1) {
    return step > 0 ? 0 : lastIndex;
  }

  const nextIndex = currentIndex + step;

  if (nextIndex < 0) {
    return loop ? lastIndex : 0;
  }

  if (nextIndex >= length) {
    if (loop) return 0;
    return currentIndex > length ? length : currentIndex;
  }

  return nextIndex;
};

/**
 * Get's the previous index based on the current index.
 *
 * @param index - the current index
 * @param count - the length or total count of items in the array
 * @param loop - whether we should circle back to the
 * first/last once `currentIndex` is at the start/end
 */
export const getPrevIndex = (
  index: number,
  count: number,
  loop = true,
): number => getNextIndex(index, count, -1, loop);

export const getPrevItem = <T>(index: number, array: T[], loop = true): T => {
  const prevIndex = getPrevIndex(index, array.length, loop);

  return array[prevIndex];
};

export const getNextItem = <T>(index: number, array: T[], loop = true): T => {
  const nextIndex = getNextIndex(index, array.length, 1, loop);

  return array[nextIndex];
};

export const removeIndex = <T>(array: T[], index: number): T[] => {
  return array.filter((_, idx) => idx !== index);
};

export const addItem = <T>(array: T[], item: T): T[] => {
  return [...array, item];
};

export const removeItem = <T>(array: T[], item: T): T[] => {
  return array.filter((eachItem) => eachItem !== item);
};

export const patchItem = <T>(array: T[], item: T, index: number): T[] => {
  return [
    ...array.slice(0, index),
    item,
    ...array.slice(index - 1, array.length),
  ];
};

/**
 * Converts an array into smaller chunks or groups.
 *
 * @param array the array to chunk into group
 * @param length the length of each chunk
 */
export const chunk = <T>(array: T[], length: number): T[][] => {
  return array.reduce((rows: T[][], currentValue: T, index: number) => {
    if (index % length === 0) {
      rows.push([currentValue]);
    } else {
      rows[rows.length - 1].push(currentValue);
    }
    return rows;
  }, [] as T[][]);
};

/**
 * Generate an array of numbers, for iteration
 *
 * @example
 * // You can pass a single number, to generate a range from 0 through that number:
 * range(5); // [0, 1, 2, 3, 4]
 *
 * // You can pass two numbers, to generate a range from start to finish:
 * range(5, 10); // [5, 6, 7, 8, 9]
 *
 * // Finally, you can pass a third "step" argument, if you want to change the gap between numbers:
 * range(0, 6, 2); // [0, 2, 4]
 * range(10, 12, 0.5); // [10, 10.5, 11, 11.5]
 *
 * @note
 * You'll notice that the array produced is inclusive of the starting number, but exclusive of the ending number.
 * `range(10, 20)` includes 10, but does not include 20.
 * This is done intentionally, to match the behaviour of JavaScript methods like slice.
 *
 * @see https://www.joshwcomeau.com/snippets/javascript/range/
 */
export const range = (start: number, end?: number, step = 1): number[] => {
  const output: number[] = [];
  const startEdge = end ? start : 0;
  const endEdge = end ?? start;

  for (let i = startEdge; i < endEdge; i += step) {
    output.push(i);
  }

  return output;
};
