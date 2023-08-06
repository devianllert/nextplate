import { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/nextjs';

import { configureReq } from '@/shared/lib/sentry';

const fileLabel = 'api/status';

/**
 * Status endpoint - Prints the "status" of the deployed instance.
 *
 * Prints useful information regarding the deployment.
 * Meant to be used for debugging purposes.
 * Can also be used as "ping endpoint" to make sure the app is online.
 *
 * @param req
 * @param res
 * @method GET
 */
export const status = (req: NextApiRequest, res: NextApiResponse): void => {
  try {
    configureReq(req, { fileLabel });

    res.json({
      appStage: process.env.NEXT_PUBLIC_APP_STAGE,
      appName: process.env.NEXT_PUBLIC_APP_NAME,
      appRelease: process.env.NEXT_PUBLIC_APP_VERSION,
      appBuildTime: process.env.NEXT_PUBLIC_BUILD_TIME,
      appBuildId: process.env.NEXT_PUBLIC_BUILD_ID,
      nodejs: process.version,
      regionVERCEL: process.env.VERCEL_REGION,
      timezone: process.env.TZ,
      memory: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
      environment: process.env.NODE_ENV,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    });
  } catch (e: unknown) {
    res.json({
      error: true,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      message: process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? undefined : (e as Error).message,
    });
  }
};

export default Sentry.withSentry(status);
