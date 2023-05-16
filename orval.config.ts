/* eslint-disable import/no-extraneous-dependencies */

import { defineConfig } from 'orval';
import { loadEnvConfig } from '@next/env';
import { accessToken, refreshToken } from './mocks/auth-mock';

loadEnvConfig(process.cwd());

export default defineConfig({
  api: {
    output: {
      mock: true,
      client: 'axios-functions',
      target: 'src/shared/api/api.generated.ts',
      mode: 'single',
      override: {
        mock: {
          properties: {
            access: accessToken,
            refresh: refreshToken,
          },
        },
        mutator: {
          path: './src/shared/api/http-client.ts',
          name: 'httpClient',
        },
      },
    },
    input: {
      validation: true,
      target: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/swagger-json`,
    },
    hooks: {
      afterAllFilesWrite: 'yarn lint:fix',
    },
  },
});
