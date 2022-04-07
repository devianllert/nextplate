/**
 * Checks whether the current runtime is a browser
 */
export const isBrowser = (): boolean => typeof window !== 'undefined';
