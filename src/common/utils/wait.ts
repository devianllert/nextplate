/* eslint-disable @typescript-eslint/no-unsafe-argument */

/**
 * Wait for X ms till resolving promise (with optional callback)
 */
export const wait = <T extends (...args: any[]) => any>(
  duration: number,
  callback?: T,
): Promise<T extends void ? void : T extends (...args: any[]) => infer U ? U : never> => new Promise((resolve) => setTimeout(() => resolve(callback?.()), duration));
