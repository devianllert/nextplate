/**
 * Declare known environment variables.
 * Enables auto-completion when using "process.env.".
 * Makes it easier to find env vars, and helps avoid typo mistakes.
 *
 * Unlisted env vars will still be usable.
 *
 * @see https://stackoverflow.com/a/53981706/2391795
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_GRAPHQL_API_ENDPOINT: string;
      IS_SERVER_INITIAL_BUILD: '1' | undefined;
      NODE_ENV: 'development' | 'production';
      NEXT_PUBLIC_APP_BUILD_ID: string;
      NEXT_PUBLIC_APP_NAME: string;
      NEXT_PUBLIC_APP_NAME_VERSION: string;
      NEXT_PUBLIC_APP_VERSION_RELEASE: string;
      NEXT_PUBLIC_APP_STAGE: 'test' | 'development' | 'staging' | 'production';
      NEXT_PUBLIC_APP_BUILD_TIME: string;
      NEXT_PUBLIC_APP_BUILD_TIMESTAMP: string;

      // Sentry variables
      NEXT_PUBLIC_SENTRY_DSN: string;
      SENTRY_AUTH_TOKEN: string;

      // Git env variables
      GIT_COMMIT_SHA_SHORT: string;
      GIT_COMMIT_SHA: string;
      GIT_COMMIT_REF: string;
      GIT_COMMIT_TAGS: string;

      // Other
      TZ: string; // TimeZone (":UTC")
    }
  }
}

// Trick to make this a valid module:
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
