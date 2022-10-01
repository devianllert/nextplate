import pino, { DestinationStream } from 'pino';
import { logflarePinoVercel } from 'pino-logflare';

const { stream, send } = logflarePinoVercel({
  apiKey: process.env.NEXT_PUBLIC_LOGFLARE_KEY || 'BhPKtO8HHxMu',
  sourceToken: process.env.NEXT_PUBLIC_LOGFLARE_STREAM || '39f1cc63-2e2f-4287-8963-d6abd376f14f',
});

const logger = pino(
  {
    browser: {
      transmit: {
        send,
      },
    },
    level: process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? 'error' : 'debug',
    base: {
      env: process.env.NODE_ENV || 'ENV not set',
      revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
    },
  },
  stream as DestinationStream,
);

export { logger };
