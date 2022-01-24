import darkColors from '@/common/design/themes/dark/colors';
import lightColors from '@/common/design/themes/light/colors';

export const APP_TITLE = 'dvnllrt';

export const getAppTitle = (title?: string): string => (title ? `${title} | ${APP_TITLE}` : APP_TITLE);

export const getMetaImageUrl = (image: string): string => (image.startsWith('https://') ? image : `${process.env.NEXT_PUBLIC_APP_URL}${image}`);

export const getCommonMetaTags = () => (
  <>
    <meta name="theme-color" content={lightColors.radix.primary9} media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content={darkColors.radix.primary9} media="(prefers-color-scheme: dark)" />
    <link key="manifest" rel="manifest" href="/site.webmanifest" />
    <link key="favicon" rel="icon" href="/favicon.ico" />
  </>
);

export const getLinksAlternateHref = (asPath: string, locales: string[] = []) => {
  return process.env.NEXT_PUBLIC_APP_URL && locales.concat('x-default').map((locale: string) => {
    const localePath = locale === 'x-default' ? '' : `${locale}`;
    const href = `${process.env.NEXT_PUBLIC_APP_URL}/${localePath}${asPath === '/' ? '' : asPath}`;

    return locale === 'cimode' ? null : (
      <link key={locale} rel="alternate" hrefLang={locale} href={href} />
    );
  });
};
