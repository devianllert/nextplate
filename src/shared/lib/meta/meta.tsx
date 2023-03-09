import { defaultTheme } from '@effable/react';

export const APP_TITLE = 'nextplate';

export const getAppTitle = (title?: string): string => (title ? `${title} | ${APP_TITLE}` : APP_TITLE);

export const getMetaImageUrl = (image: string): string => (image.startsWith('https://') ? image : `${process.env.NEXT_PUBLIC_APP_URL}${image}`);

export const getCommonMetaTags = () => (
  <>
    <meta name="theme-color" content={defaultTheme.colors.light.accent.accent9} media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content={defaultTheme.colors.dark?.accent.accent9} media="(prefers-color-scheme: dark)" />

    <link key="manifest" rel="manifest" href="/site.webmanifest" />
    <link key="favicon" rel="icon" href="/favicon.ico" />
    <link rel="icon" sizes="16x16" type="image/png" href="favicon-16x16.png" />
    <link rel="icon" sizes="32x32" type="image/png" href="favicon-32x23.png" />
    <link rel="icon" sizes="192x192" type="image/png" href="/android-chrome-192x192.png" />
    <link key="apple-touch-icon" rel="apple-touch-icon" href="/apple-touch-icon.png" />
  </>
);

export const getLinksAlternateHref = (asPath: string, locales: string[] = []) => {
  return (
    process.env.NEXT_PUBLIC_APP_URL
    && locales.concat('x-default').map((locale: string) => {
      const localePath = locale === 'x-default' ? '' : `${locale}`;
      const href = `${process.env.NEXT_PUBLIC_APP_URL}/${localePath}${asPath === '/' ? '' : asPath}`;

      return locale === 'cimode' ? null : <link key={locale} rel="alternate" hrefLang={locale} href={href} />;
    })
  );
};
