// @ts-check
/* eslint-disable import/no-extraneous-dependencies */

import { readFileSync } from 'node:fs';

import bundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';

import nextI18nConfig from './next-i18next.config.mjs';

/**
 * Once supported replace by node / eslint / ts and out of experimental, replace by
 * `import packageJson from './package.json' assert { type: 'json' };`
 * @type {import('type-fest').PackageJson}
 */
const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)).toString('utf-8'));

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE_BUNDLE === 'true',
});

const trueEnv = ['true', '1', 'yes'];

const NEXT_DISABLE_SENTRY =
  !process.env.NEXT_PUBLIC_SENTRY_DSN || trueEnv.includes(process.env?.NEXT_DISABLE_SENTRY ?? 'false');
const NEXT_SENTRY_DEBUG = trueEnv.includes(process.env?.NEXT_SENTRY_DEBUG ?? 'false');
const NEXT_SENTRY_TRACING = trueEnv.includes(process.env?.NEXT_SENTRY_TRACING ?? 'false');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ['page.mdx', 'page.md', 'page.jsx', 'page.js', 'page.tsx', 'page.ts'],

  optimizeFonts: true,

  i18n: nextI18nConfig.i18n,

  images: {
    domains: ['images.unsplash.com', 'placehold.co'],
  },

  experimental: {
    scrollRestoration: true,
  },

  productionBrowserSourceMaps: true,

  poweredByHeader: false,

  rewrites() {
    const rewrites = [
      /**
       * Proxy for backend
       */
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/:path*`,
      },
    ];

    return Promise.resolve(rewrites);
  },

  async headers() {
    const ContentSecurityPolicy = `
      child-src 'none';
      prefetch-src 'self';
      base-uri 'none';
      worker-src 'self' blob:;
      connect-src 'self' *.dvnllrt.com ${process.env.VERCEL_URL} ${
      process.env.NEXT_PUBLIC_API_ENDPOINT
    } *.sentry.io https://vitals.vercel-insights.com https://wttr.in https://api.logflare.app;
      default-src 'self';
      img-src 'self' https://images.unsplash.com https://placehold.co blob: data:;
      script-src 'self' 'unsafe-inline' ${process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ''};
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

    return Promise.resolve(headers);
  },

  webpack: (config, { webpack, isServer }) => {
    if (!isServer) {
      // Fixes npm packages that depend on `fs` module
      // @link https://github.com/vercel/next.js/issues/36514#issuecomment-1112074589
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, no-param-reassign
      config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    }

    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/tree-shaking/
    config.plugins.push(
      new webpack.DefinePlugin({
        __SENTRY_DEBUG__: NEXT_SENTRY_DEBUG,
        __SENTRY_TRACING__: NEXT_SENTRY_TRACING,
        SENTRY_RELEASE: packageJson.version,
      }),
    );

    return config;
  },
  env: {
    NEXT_PUBLIC_APP_NAME: packageJson.name ?? 'APP_NAME-ENV-not-found',
    NEXT_PUBLIC_APP_VERSION: packageJson.version ?? 'unknown',
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
};

// eslint-disable-next-line import/no-mutable-exports
let config = nextConfig;

if (!NEXT_DISABLE_SENTRY) {
  // @ts-expect-error wrong next config type from sentry
  config = withSentryConfig(
    config,
    {
      // Additional config options for the Sentry Webpack plugin. Keep in mind that
      // the following options are set automatically, and overriding them is not
      // recommended:
      //   release, url, org, project, authToken, configFile, stripPrefix,
      //   urlPrefix, include, ignore
      // For all available options, see:
      // @link https://github.com/getsentry/sentry-webpack-plugin#options.

      // Attempts a dry run (useful for dev environments).
      // Defaults to false, but may be automatically set to true in development environments
      // by some framework integrations (Next.JS, possibly others).
      // dryRun: NEXT_SENTRY_UPLOAD_DRY_RUN,

      // Suppresses all logs (useful for --json option). Defaults to false.
      silent: true,

      debug: false,

      // release: '',
      // url: '',
      // org: '',
      // project: '',
      // authToken: '',
      // configFile: '',
      // stripPrefix: '',
      // urlPrefix: '',
      // include: '',
      // ignore: '',
    },
    { hideSourceMaps: true },
  );
} else {
  const { sentry, ...rest } = config;
  config = rest;
}

if (process.env.ANALYZE_BUNDLE === 'true') {
  config = withBundleAnalyzer(config);
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
export default config;
