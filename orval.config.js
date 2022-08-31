// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  api: {
    output: {
      target: 'src/shared/api/api.generated.ts',
      mode: 'single',
      override: {
        mutator: {
          path: './src/shared/api/api.ts',
          name: 'api',
        },
      },
    },
    input: {
      target: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/swagger-json`,
    },
    hooks: {
      afterAllFilesWrite: 'yarn lint:fix',
    },
  },
};
