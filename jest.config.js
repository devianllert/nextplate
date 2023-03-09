/** @type {import('jest').Config} */
module.exports = {
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest'],
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  /**
   * Map our module path aliases, so that Jest can understand modules loaded using "@/shared" and load the proper file.
   * Required, or Jest will fail to import dependencies from tests.
   *
   * Note: The below list must match `tsconfig.json:compilerOptions.paths`, so the Next.js app and Jest resolve all aliases the same way.
   *
   * @see https://nextjs.org/docs/advanced-features/module-path-aliases
   * @see https://github.com/ilearnio/module-alias/issues/46#issuecomment-546154015
   */
  moduleNameMapper: {
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/public/(.*)$': '<rootDir>/public/$1',
    '^@/shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@/components/(.*)$': '<rootDir>/src/shared/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/shared/lib/$1',
    '^@/layouts/(.*)$': '<rootDir>/src/widgets/layouts/$1',
    '^@/entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@/modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
  },
  modulePathIgnorePatterns: ['.next/', 'cypress'],
  setupFilesAfterEnv: [
    'jest-extended', // Extends native "expect" abilities - See https://github.com/jest-community/jest-extended
    '<rootDir>/jest.setup.js',
    '<rootDir>/jest.extends.ts',
  ],
};
