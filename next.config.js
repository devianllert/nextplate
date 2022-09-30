/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */

const bundleAnalyzer = require('@next/bundle-analyzer');
const { withSentryConfig } = require('@sentry/nextjs');

const packageJson = require('./package.json');
const i18nConfig = require('./next-i18next.config');

const withBundleAnalyzer = bundleAnalyzer({
  // Run with "yarn analyse:bundle" - See https://www.npmjs.com/package/@next/bundle-analyzer
  enabled: process.env.ANALYZE_BUNDLE === 'true',
});

// Paths that mustn't have rewrite applied to them, to avoid the whole app to behave inconsistently
const noRedirectBlacklistedPaths = ['_next', 'api'];
// All items (folders, files) under /public directory should be added there, to avoid redirection when an asset isn't found
const publicBasePaths = ['robots', 'static', 'favicon.ico'];
// Will disable url rewrite for those items (should contain all supported languages and all public base paths)
const noRedirectBasePaths = [...publicBasePaths, ...noRedirectBlacklistedPaths];

const GIT_COMMIT_SHA_SHORT =
  typeof process.env.GIT_COMMIT_SHA === 'string' && process.env.GIT_COMMIT_SHA.substring(0, 8);

console.debug(
  `Building Next with NODE_ENV="${process.env.NODE_ENV}" NEXT_PUBLIC_APP_STAGE="${process.env.NEXT_PUBLIC_APP_STAGE}" using GIT_COMMIT_SHA=${process.env.GIT_COMMIT_SHA} and GIT_COMMIT_REF=${process.env.GIT_COMMIT_REF}`,
);

// We use `filter` to make sure there are not empty element.
// Default value is an empty array.
const GIT_COMMIT_TAGS = process.env.GIT_COMMIT_TAGS ? process.env.GIT_COMMIT_TAGS.trim() : '';
console.debug(`Deployment will be tagged automatically, using GIT_COMMIT_TAGS: "${GIT_COMMIT_TAGS}"`);

// Iterate over all tags and extract the first the match "v*"
const APP_RELEASE_TAG = GIT_COMMIT_TAGS
  ? GIT_COMMIT_TAGS.split(' ').find((tag) => tag.startsWith('v'))
  : packageJson.version;
console.debug(`Release version resolved from tags: "${APP_RELEASE_TAG}" (matching first tag starting with "v")`);

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.

  // Note: The error "Error: Cannot find module '/.next/server/sentry/initServerSDK.js'" in the console is a false-positive error
  //  See https://github.com/getsentry/sentry-docs/issues/3721

  debug: false,
  silent: true,
};

/**
 * This file is for advanced configuration of the Next.js framework.
 *
 * The below config applies to the whole application.
 * next.config.js gets used by the Next.js server and build phases, and it's not included in the browser build.
 *
 * Note: Not all configuration options are listed below, we only kept those of most interest.
 *  You'll need to dive into Next.js own documentation to find out about what's not included.
 *  Basically, we focused on options that seemed important for a SSG/SSR app running on serverless mode (Vercel).
 *  Also, we included some options by are not using them, this is mostly to help make you aware of those options, in case you'd need them.
 *
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
/** @type {import('next').NextConfig} */
module.exports = withSentryConfig(
  withBundleAnalyzer({
    // basepath: '', // If you want Next.js to cover only a subsection of the domain. See https://nextjs.org/docs/api-reference/next.config.js/basepath
    // target: 'serverless', // Automatically enabled on Vercel, you may need to manually opt-in if you're not using Vercel. See https://nextjs.org/docs/api-reference/next.config.js/build-target#serverless-target
    // trailingSlash: false, // By default Next.js will redirect urls with trailing slashes to their counterpart without a trailing slash. See https://nextjs.org/docs/api-reference/next.config.js/trailing-slash

    /**
     * React's Strict Mode is a development mode only feature for highlighting potential problems in an application.
     * It helps to identify unsafe lifecycles, legacy API usage, and a number of other features.
     *
     * Officially suggested by Next.js:
     * We strongly suggest you enable Strict Mode in your Next.js application to better prepare your application for the future of React.
     *
     * If you or your team are not ready to use Strict Mode in your entire application, that's OK! You can incrementally migrate on a page-by-page basis using <React.StrictMode>.
     *
     * Strict mode can't automatically detect side effects for you,
     * but it can help you spot them by making them a little more deterministic.
     * This is done by intentionally double-invoking the following functions:
     * - Class component constructor , render , shouldComponentUpdate
     * - Function component bodies
     * - Functions passed to useState, useMemo, or useReducer.
     *
     * @see https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
     *
     */
    // reactStrictMode: true,

    i18n: i18nConfig.i18n,

    pageExtensions: ['page.mdx', 'page.md', 'page.jsx', 'page.js', 'page.tsx', 'page.ts'],

    images: {
      domains: ['images.unsplash.com'],
    },

    experimental: {
      scrollRestoration: true,
    },

    productionBrowserSourceMaps: true,

    /**
     * Environment variables added to JS bundle
     *
     * Used to inject dynamic environment variables.
     *
     * @see https://nextjs.org/docs/api-reference/next.config.js/environment-variables
     */
    env: {
      NEXT_PUBLIC_APP_BUILD_TIME: new Date().toString(),
      NEXT_PUBLIC_APP_BUILD_TIMESTAMP: Date.now(),
      NEXT_PUBLIC_APP_NAME: packageJson.name,
      NEXT_PUBLIC_APP_NAME_VERSION: `${packageJson.name}@${APP_RELEASE_TAG}`,

      LOGGER_ENV: process.env.NEXT_PUBLIC_APP_STAGE,

      GITHUB_DISPATCH_TOKEN: process.env.GITHUB_DISPATCH_TOKEN,
      GIT_COMMIT_SHA_SHORT,
      GIT_COMMIT_SHA: process.env.GIT_COMMIT_SHA, // Resolve commit hash from ENV first (set through CI), fallbacks to reading git (when used locally, through "/scripts/populate-git-env.sh")
      GIT_COMMIT_REF: process.env.GIT_COMMIT_REF, // Resolve commit ref (branch/tag) from ENV first (set through CI), fallbacks to reading git (when used locally, through "/scripts/populate-git-env.sh")
      GIT_COMMIT_TAGS: process.env.GIT_COMMIT_TAGS || '', // Resolve commit tags/releases from ENV first (set through CI), fallbacks to reading git (when used locally, through "/scripts/populate-git-env.sh")
    },

    /**
     * Headers allow you to set custom HTTP headers for an incoming request path.
     *
     * Headers allow you to set route specific headers like CORS headers, content-types, and any other headers that may be needed.
     * They are applied at the very top of the routes.
     *
     * @return {Promise<Array<{ headers: [{value: string, key: string}], source: string }>>}
     * @see https://nextjs.org/docs/api-reference/next.config.js/headers
     * @since 9.5 - See https://nextjs.org/blog/next-9-5#headers
     */
    async headers() {
      // TODO: add documentation for nonce usage
      // TODO: add strict-dynamic
      const ContentSecurityPolicy = `
        child-src 'none';
        prefetch-src 'self';
        base-uri 'none';
        worker-src 'self' blob:;
        connect-src 'self' *.sentry.io https://vitals.vercel-insights.com ${process.env.NEXT_PUBLIC_API_ENDPOINT} https://wttr.in;
        default-src 'self';
        img-src 'self' blob: data:;
        script-src 'self' ${process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ''};
        style-src 'self' 'unsafe-inline';
        font-src 'self';
        form-action 'self';
        frame-ancestors 'self';
        manifest-src 'self';
        media-src 'self' blob:;
        object-src 'none';
        report-uri https://o530284.ingest.sentry.io/api/5649574/security/?sentry_key=b8626459ddd0442b8bd63deeba233ef1;
      `;

      const headers = [
        {
          // Make all fonts immutable and cached for one year
          source: '/static/media/(.*?)',
          headers: [
            {
              key: 'Cache-Control',
              // See https://www.keycdn.com/blog/cache-control-immutable#what-is-cache-control-immutable
              // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#browser_compatibility
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          // Make all other static assets immutable and cached for one hour
          source: '/static/(.*?)',
          headers: [
            {
              key: 'Cache-Control',
              // See https://www.keycdn.com/blog/cache-control-immutable#what-is-cache-control-immutable
              // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#browser_compatibility
              value: 'public, max-age=3600, immutable',
            },
          ],
        },
        {
          source: '/:path*', // Match all paths, including "/" - See https://github.com/vercel/next.js/discussions/17991#discussioncomment-112028
          headers: [
            // This directive helps protect against some XSS attacks
            // See https://infosec.mozilla.org/guidelines/web_security#x-content-type-options
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN',
            },

            // This directive helps protect user's privacy and might avoid leaking sensitive data in urls to 3rd parties (e.g: when loading a 3rd party asset)
            // See https://infosec.mozilla.org/guidelines/web_security#referrer-policy
            // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
            // See https://scotthelme.co.uk/a-new-security-header-referrer-policy/
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },

            /* This header controls DNS prefetching,
             * allowing browsers to proactively perform domain name resolution
             * on external links, images, CSS, JavaScript, and more.
             * This prefetching is performed in the background,
             * so the DNS is more likely to be resolved by the time
             * the referenced items are needed.
             * This reduces latency when the user clicks a link.
             */
            {
              key: 'X-DNS-Prefetch-Control',
              value: 'on',
            },

            // This header stops pages from loading when they detect reflected cross-site scripting (XSS) attacks. Although this protection is not necessary when sites implement a strong Content-Security-Policy disabling the use of inline JavaScript ('unsafe-inline'), it can still provide protection for older web browsers that don't support CSP.
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },

            {
              key: 'Content-Security-Policy',
              value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
            },
          ],
        },
        {
          source: '/api/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Credentials',
              value: 'true',
            },
            {
              key: 'Access-Control-Allow-Origin',
              value: process.env.NEXT_PUBLIC_APP_URL,
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
            },
            {
              key: 'Access-Control-Allow-Headers',
              value:
                'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
            },
          ],
        },
      ];

      console.info('Using headers:', JSON.stringify(headers, null, 2));

      return headers;
    },

    /**
     * Rewrites allow you to map an incoming request path to a different destination path.
     *
     * Rewrites are only available on the Node.js environment and do not affect client-side routing.
     * Rewrites are the most commonly used form of custom routing — they're used for dynamic routes (pretty URLs), user-land routing libraries (e.g. next-routes), internationalization, and other advanced use cases.
     *
     * For example, the route /user/:id rendering a specific user's profile page is a rewrite.
     * Rendering your company's about page for both /about and /fr/a-propos is also a rewrite.
     * The destination url can be internal, or external.
     *
     * @return { Promise<Array<{ destination: string, source: string, headers: Array<{ key: string, value: string }> }>> }
     * @see https://nextjs.org/docs/api-reference/next.config.js/rewrites
     * @since 9.5 - See https://nextjs.org/blog/next-9-5#rewrites
     */
    async rewrites() {
      const rewrites = [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/:path*`,
        },
      ];

      console.info('Using rewrites:', rewrites);

      return rewrites;
    },

    /**
     * Redirects allow you to redirect an incoming request path to a different destination path.
     *
     * Redirects are only available on the Node.js environment and do not affect client-side routing.
     * By redirects, we mean HTTP Redirects (aka URL forwarding).
     * Redirects are most commonly used when a website is reorganized — ensuring search engines and bookmarks are forwarded to their new locations.
     * The destination url can be internal, or external.
     *
     * @return { Promise<Array<{ permanent: boolean, destination: string, source: string, statusCode?: number }>> }
     * @see https://nextjs.org/docs/api-reference/next.config.js/redirects
     * @since 9.5 - See https://nextjs.org/blog/next-9-5#redirects
     */
    // async redirects() {
    //   const redirects = [
    //     // I18n redirects
    //     {
    //       // Redirect root link with trailing slash to non-trailing slash, avoids 404 - See https://github.com/vercel/next.js/discussions/10651#discussioncomment-8270
    //       source: '/:locale/',
    //       destination: '/:locale',
    //       permanent: process.env.NEXT_PUBLIC_APP_STAGE !== 'development', // Do not use permanent redirect locally to avoid browser caching when working on it
    //     },
    //   ];

    //   console.info('Using redirects:', redirects);

    //   return redirects;
    // },

    /**
     *
     * The webpack function is executed twice, once for the server and once for the client.
     * This allows you to distinguish between client and server configuration using the isServer property.
     *
     * @param config Current webpack config. Useful to reuse parts of what's already configured while overridding other parts.
     * @param buildId The build id, used as a unique identifier between builds.
     * @param dev Indicates if the compilation will be done in development.
     * @param isServer It's true for server-side compilation, and false for client-side compilation.
     * @param defaultLoaders Default loaders used internally by Next.js:
     *  - babel Default babel-loader configuration
     * @see https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
     */
    webpack: (config, { buildId, isServer }) => {
      const APP_VERSION_RELEASE = APP_RELEASE_TAG || buildId;
      config.plugins.forEach((plugin) => {
        // Inject custom environment variables in "DefinePlugin" - See https://webpack.js.org/plugins/define-plugin/
        if (Object.getPrototypeOf(plugin).constructor.name === 'DefinePlugin') {
          // Dynamically add some "public env" variables that will be replaced during the build through "DefinePlugin"
          // Those variables are considered public because they are available at build time and at run time (they'll be replaced during initial build, by their value)
          plugin.definitions['process.env.NEXT_PUBLIC_APP_BUILD_ID'] = JSON.stringify(buildId);
          plugin.definitions['process.env.NEXT_PUBLIC_APP_VERSION_RELEASE'] = JSON.stringify(APP_VERSION_RELEASE);
          // Necessary to forward it automatically to source maps
          plugin.definitions['process.env.SENTRY_RELEASE'] = JSON.stringify(APP_VERSION_RELEASE);
        }
      });

      if (isServer) {
        // Trick to only log once
        console.debug(`[webpack] Building release "${APP_VERSION_RELEASE}" using NODE_ENV="${process.env.NODE_ENV}"`);
      }

      return config;
    },

    /**
     * Next.js uses a constant id generated at build time to identify which version of your application is being served.
     *
     * This can cause problems in multi-server deployments when next build is ran on every server.
     * In order to keep a static build id between builds you can provide your own build id.
     *
     * Note: We documented this function in case you might want to use it, but we aren't using it.
     *
     * @see https://nextjs.org/docs/api-reference/next.config.js/configuring-the-build-id
     */
    // generateBuildId: async () => {
    //   // You can, for example, get the latest git commit hash here
    //   return 'my-build-id'
    // },

    /**
     * Next.js exposes some options that give you some control over how the server will dispose or keep in memory built pages in development.
     *
     * Note: We documented this function in case you might want to use it, but we aren't using it.
     *
     * @see https://nextjs.org/docs/api-reference/next.config.js/configuring-onDemandEntries
     */
    // onDemandEntries: {
    //   // period (in ms) where the server will keep pages in the buffer
    //   maxInactiveAge: 25 * 1000,
    //   // number of pages that should be kept simultaneously without being disposed
    //   pagesBufferLength: 2,
    // },

    /**
     * By default Next.js will add the x-powered-by header.
     * To opt-out of it, open next.config.js and disable the poweredByHeader config:
     *
     * @see https://nextjs.org/docs/api-reference/next.config.js/disabling-x-powered-by
     */
    poweredByHeader: false,
  }),
  SentryWebpackPluginOptions,
);
