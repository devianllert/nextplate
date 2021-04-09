/**
 * Returns a number whose value is limited to the given range.
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
export const clamp = (value: number, min = 0, max = 1): number => {
  return Math.min(Math.max(min, value), max);
};
