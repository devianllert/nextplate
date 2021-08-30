import { createLogger } from '@/modules/core/logging/logger';
import * as Sentry from '@sentry/nextjs';

import isBrowser from './isBrowser';

const fileLabel = 'common/utils/mobile';
const logger = createLogger(fileLabel);

/**
 * Returns whether running on a mobile device
 */
export const isMobileDevice = (): boolean => {
  if (isBrowser()) {
    try {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    } catch (e) {
      logger.error(e.message);
      Sentry.captureException(e);

      return false;
    }
  } else {
    return false;
  }
};
