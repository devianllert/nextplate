// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// eslint-disable-next-line import/no-unresolved
import { setupSentry } from '@/shared/lib/sentry';

setupSentry();
