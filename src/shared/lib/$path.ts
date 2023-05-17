export const pagesPath = {
  $404: {
    $url: (url?: { hash?: string }) => ({ pathname: '/404' as const, hash: url?.hash }),
  },
  auth: {
    login: {
      $url: (url?: { hash?: string }) => ({ pathname: '/auth/login' as const, hash: url?.hash }),
    },
    signup: {
      $url: (url?: { hash?: string }) => ({ pathname: '/auth/signup' as const, hash: url?.hash }),
    },
  },
  dashboard: {
    $url: (url?: { hash?: string }) => ({ pathname: '/dashboard' as const, hash: url?.hash }),
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash }),
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  locales: {
    en: {
      $404_json: '/locales/en/404.json',
      auth_json: '/locales/en/auth.json',
      common_json: '/locales/en/common.json',
      index_json: '/locales/en/index.json',
    },
    ru: {
      $404_json: '/locales/ru/404.json',
      auth_json: '/locales/ru/auth.json',
      common_json: '/locales/ru/common.json',
      index_json: '/locales/ru/index.json',
    },
  },
  site_webmanifest: '/site.webmanifest',
  static: {
    images: {
      $404_png: '/static/images/404.png',
      android_chrome_192x192_png: '/static/images/android-chrome-192x192.png',
      android_chrome_512x512_png: '/static/images/android-chrome-512x512.png',
      apple_touch_icon_png: '/static/images/apple-touch-icon.png',
      circle_scatter_svg: '/static/images/circle-scatter.svg',
      favicon_16x16_png: '/static/images/favicon-16x16.png',
      favicon_32x32_png: '/static/images/favicon-32x32.png',
      favicon_ico: '/static/images/favicon.ico',
      logo_og_png: '/static/images/logo-og.png',
      maskable_icon_png: '/static/images/maskable_icon.png',
      tools: {
        effector_png: '/static/images/tools/effector.png',
        eslint_png: '/static/images/tools/eslint.png',
        fsd_png: '/static/images/tools/fsd.png',
        i18n_png: '/static/images/tools/i18n.png',
        jest_png: '/static/images/tools/jest.png',
        next_png: '/static/images/tools/next.png',
        sentry_png: '/static/images/tools/sentry.png',
        storybook_png: '/static/images/tools/storybook.png',
        typescript_png: '/static/images/tools/typescript.png',
      },
      vercel_svg: '/static/images/vercel.svg',
    },
  },
} as const;

export type StaticPath = typeof staticPath;
