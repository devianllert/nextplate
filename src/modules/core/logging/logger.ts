import { createLogger as createConsoleLogger, Logger } from './createLogger';

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
    return global.muteConsole();
  }

  return createConsoleLogger({
    prefix: fileLabel,
    shouldShowTime: () => false,
    shouldPrint: (mode) => {
      return process.env.NEXT_PUBLIC_APP_STAGE !== 'production';
    },
  });
};
