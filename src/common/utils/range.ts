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

export default range;
