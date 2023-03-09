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
      // Server variables
      NODE_ENV: 'test' | 'development' | 'production';
      SENTRY_AUTH_TOKEN: string;

      // Public variables
      NEXT_PUBLIC_APP_STAGE: 'test' | 'development' | 'staging' | 'production';
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_APP_NAME: string;
      NEXT_PUBLIC_APP_VERSION: string;
      NEXT_PUBLIC_API_ENDPOINT: string;
      NEXT_PUBLIC_BUILD_TIME: string;
      NEXT_PUBLIC_SENTRY_DSN?: string;
      NEXT_PUBLIC_LOGFLARE_KEY: string;
      NEXT_PUBLIC_LOGFLARE_STREAM: string;
    }
  }
}

// Trick to make this a valid module:
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
