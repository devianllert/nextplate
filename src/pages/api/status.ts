import { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/nextjs';

import { configureReq } from '@/modules/core/sentry/sentry';

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
      appRelease: process.env.NEXT_PUBLIC_APP_VERSION_RELEASE,
      appBuildTime: process.env.NEXT_PUBLIC_APP_BUILD_TIME,
      appBuildTimeISO: new Date(process.env.NEXT_PUBLIC_APP_BUILD_TIME).toISOString(),
      appBuildTimestamp: process.env.NEXT_PUBLIC_APP_BUILD_TIMESTAMP,
      appBuildId: process.env.NEXT_PUBLIC_APP_BUILD_ID,
      nodejs: process.version,
      regionVERCEL: process.env.VERCEL_REGION,
      timezone: process.env.TZ,
      memory: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
      environment: process.env.NODE_ENV,
      GIT_COMMIT_SHA: process.env.GIT_COMMIT_SHA,
      GIT_COMMIT_REF: process.env.GIT_COMMIT_REF,
      GIT_COMMIT_TAGS: process.env.GIT_COMMIT_TAGS,
      NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
      // Shouldn't be displayed, because should always be undefined in APIs
      IS_SERVER_INITIAL_BUILD: process.env.IS_SERVER_INITIAL_BUILD,
    });
  } catch (e: unknown) {
    res.json({
      error: true,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      message:
        process.env.NEXT_PUBLIC_APP_STAGE === 'production'
          ? undefined
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          : (e as Error).message,
    });
  }
};

export default Sentry.withSentry(status);
