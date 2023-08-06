import { NextFetchEvent, NextRequest } from 'next/server';
import pico from 'picocolors';

import { MiddlewareFactory } from './types';

export const withLogging: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    console.debug(`${pico.green('[request]')}: ${request.method} • ${request.nextUrl.pathname}`);

    return next(request, _next);
  };
};
