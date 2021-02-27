/**
 * Checks whether the current runtime is a browser
 */
const isBrowser = (): boolean => typeof window !== 'undefined';

export default isBrowser;
