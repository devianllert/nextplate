/**
 * This random function includes the lower bound, but excludes the upper bound.
 * For example, random(10, 12) will grant either 10 or 11, but never 12.
 * This was done intentionally, to match the behaviour of Math.random, as well as JavaScript methods like slice.
 *
 * @see https://www.joshwcomeau.com/snippets/javascript/random/
 */
export const random = (min: number, max: number): number => Math.floor(Math.random() * (max - min)) + min;

export default random;
