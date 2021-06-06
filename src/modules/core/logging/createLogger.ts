/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Chalk } from 'chalk';
import { Console } from 'console';

export type Logger = Console;
export type PrintMode = 'debug' | 'error' | 'group' | 'groupEnd' | 'info' | 'log' | 'warn';

export type LoggerOptions = {
  prefix?: string;
  disableAutoWrapPrefix?: boolean;
  colorize?: Colorize;
  shouldPrint?: ShouldPrint;
  shouldShowTime?: ShouldShowTime;
  timeFormat?: TimeFormat;
};

export type Colorize = (mode: PrintMode, prefixes: string[]) => string[];
export type ShouldPrint = (mode: PrintMode) => boolean;
export type ShouldShowTime = () => boolean;
export type TimeFormat = () => string;

const noop = () => {};

/**
 * By default, printing is only enabled in non-production environments.
 *
 * This behavior can be customized by defining a LOGGER_ENV which will be matched against "production".
 * This is useful when dealing with multi stages (dev, staging, production) and you want to enable logs on all stages but not for production.
 */
export const shouldPrintFallback: ShouldPrint = (): boolean => {
  if (process.env.LOGGER_ENV) {
    return process.env.LOGGER_ENV !== 'production';
  }

  return process.env.NODE_ENV !== 'production';
};

/**
 * By default, displays the time as a Date ISO string.
 */
export const timeFormatFallback: TimeFormat = () => `${new Date().toISOString()}`;

/**
 * By default, show time unless SIMPLE_LOGGER_SHOULD_SHOW_TIME has been explicitly set to "false".
 */
const shouldShowTimeFallback = (): boolean => process.env.LOGGER_SHOULD_SHOW_TIME !== 'false';

/**
 * Colorize output.
 *
 * Only colorize on the server, not on the browser
 * (keep native behavior, to avoid messing with colors and complicated browser API which is different for each browser).
 *
 * @param mode
 * @param prefixes
 */
const colorizeFallback: Colorize = (mode: Omit<PrintMode, 'groupEnd'>, prefixes: string[]): any[] => {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
    const chalk = require('chalk') as Chalk; // Require chalk on the server only, should not be included in the browser bundle
    const orange = chalk.hex('#FFA500');

    switch (mode) {
      case 'debug':
        return prefixes.map((prefix: string) => chalk.yellow(prefix));
      case 'error':
        return prefixes.map((prefix: string) => chalk.red(prefix));
      case 'group':
        return prefixes.map((prefix: string) => chalk.bgGray(prefix));
      case 'info':
        return prefixes.map((prefix: string) => chalk.blue(prefix));
      case 'log':
        return prefixes.map((prefix: string) => chalk.grey(prefix));
      case 'warn':
        return prefixes.map((prefix: string) => orange(prefix));
      default:
        return prefixes.map((prefix: string) => chalk.grey(prefix));
    }
  }

  return prefixes;
};

/**
 * Creates a logger object containing the same "print" API as the console object.
 *
 * Compatible with server and browser. (universal)
 *
 * @param options
 */
export const createLogger = (options?: LoggerOptions): Logger => {
  const {
    prefix,
    shouldPrint = shouldPrintFallback,
    disableAutoWrapPrefix = false,
    shouldShowTime = shouldShowTimeFallback,
    timeFormat = timeFormatFallback,
    colorize = colorizeFallback,
  } = options ?? {};
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
  const _prefix: string | undefined = disableAutoWrapPrefix || !prefix?.length ? prefix : `[${prefix}]`;
  // Contains an array of prefixes (tags, time, etc.)
  const prefixes: string[] = [];

  if (shouldShowTime()) {
    prefixes.push(timeFormat());
  }

  if (_prefix) {
    prefixes.push(_prefix);
  }

  return {
    ...console, // Provides the same API as the native "console" object, while overwriting a few specific methods below
    debug: shouldPrint('debug') ? console.debug.bind(null, ...colorize('debug', prefixes)) : noop,
    error: shouldPrint('error') ? console.error.bind(null, ...colorize('error', prefixes)) : noop,
    group: shouldPrint('group') ? console.group.bind(null, ...colorize('group', prefixes)) : noop,
    groupEnd: shouldPrint('groupEnd') ? console.groupEnd.bind(null) : noop,
    info: shouldPrint('info') ? console.info.bind(null, ...colorize('info', prefixes)) : noop,
    log: shouldPrint('log') ? console.log.bind(null, ...colorize('log', prefixes)) : noop,
    warn: shouldPrint('warn') ? console.warn.bind(null, ...colorize('warn', prefixes)) : noop,
  };
};
