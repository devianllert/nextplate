import { isBrowser } from '@effable/misc';

import { createLogger as createConsoleLogger, Logger } from './create-logger';

/**
 * Custom logger proxy.
 *
 * Customize the @unly/simple-logger library by providing app-wide default behavior.
 *
 * @param fileLabel
 */
export const createLogger = (fileLabel: string): Logger => {
  // Mute logger during tests, to avoid cluttering the console
  if (process.env.NODE_ENV === 'test') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return global.muteConsole();
  }

  return createConsoleLogger({
    prefix: fileLabel,
    shouldShowTime: () => false,
    shouldPrint: () => {
      return !(process.env.NEXT_PUBLIC_APP_STAGE === 'production' && isBrowser());
    },
  });
};
