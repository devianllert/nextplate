import { capitalize } from '@effable/misc';
import { defaultTheme } from '@effable/react';

export const APP_TITLE = 'nextplate';

export const getAppTitle = (title?: string): string =>
  title ? `${title} - ${capitalize(APP_TITLE)}` : capitalize(APP_TITLE);

export const getMetaImageUrl = (image: string): string =>
  image.startsWith('https://') ? image : `${process.env.NEXT_PUBLIC_APP_URL}${image}`;

export const CommonMetaTags = () => (
  <>
    <meta
      key="color-light"
      name="theme-color"
      content={defaultTheme.colors.light.accent.accent9}
      media="(prefers-color-scheme: light)"
    />
    <meta
      key="color-dark"
      name="theme-color"
      content={defaultTheme.colors.dark?.accent.accent9}
      media="(prefers-color-scheme: dark)"
    />

    <link key="manifest" rel="manifest" href="/site.webmanifest" />
    <link key="favicon" rel="icon" href="/static/images/favicon.ico" />
    <link key="icon-16x16" rel="icon" sizes="16x16" type="image/png" href="/static/images/favicon-16x16.png" />
    <link key="icon-32x32" rel="icon" sizes="32x32" type="image/png" href="/static/images/favicon-32x23.png" />
    <link
      key="icon-192x192"
      rel="icon"
      sizes="192x192"
      type="image/png"
      href="/static/images/android-chrome-192x192.png"
    />
    <link key="apple-touch-icon" rel="apple-touch-icon" href="/static/images/apple-touch-icon.png" />
  </>
);

interface GetAlternateHrefLinksProps {
  asPath: string;
  locales?: string[];
}

export const getAlternateHrefLinks = (props: GetAlternateHrefLinksProps) => {
  const { asPath, locales = [] } = props;

  if (!process.env.NEXT_PUBLIC_APP_URL) {
    return null;
  }

  return (
    <>
      {locales
        .concat('x-default')
        .filter((locale: string) => locale !== 'cimode')
        .map((locale: string) => {
          const localePath = locale === 'x-default' ? '' : `${locale}`;
          const href = `${process.env.NEXT_PUBLIC_APP_URL}/${localePath}${asPath === '/' ? '' : asPath}`;

          return <link key={locale} rel="alternate" hrefLang={locale} href={href} />;
        })}
    </>
  );
};
