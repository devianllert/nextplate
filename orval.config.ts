/* eslint-disable import/no-extraneous-dependencies */

import { defineConfig } from 'orval';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

export default defineConfig({
  api: {
    output: {
      target: 'src/shared/api/api.generated.ts',
      mode: 'single',
      override: {
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
