/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
export const clamp = (value: number, min = 0, max = 1): number => {
  return Math.min(Math.max(min, value), max);
};

/**
 * This random function includes the lower bound, but excludes the upper bound.
 * For example, random(10, 12) will grant either 10 or 11, but never 12.
 * This was done intentionally, to match the behaviour of Math.random, as well as JavaScript methods like slice.
 *
 * @see https://www.joshwcomeau.com/snippets/javascript/random/
 */
export const random = (min: number, max: number): number => Math.floor(Math.random() * (max - min)) + min;

/**
 * Convert a value to percentage based on lower and upper bound values
 *
 * @param value the value in number
 * @param min the minimum value
 * @param max the maximum value
 */
export const valueToPercent = (value: number, min: number, max: number): number => {
  return ((value - min) * 100) / (max - min);
};

/**
 * Calculate the value based on percentage, lower and upper bound values
 *
 * @param percent the percent value in decimals (e.g 0.6, 0.3)
 * @param min the minimum value
 * @param max the maximum value
 */
export const percentToValue = (percent: number, min: number, max: number): number => {
  return (max - min) * percent + min;
};
