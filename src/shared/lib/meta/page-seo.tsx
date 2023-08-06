import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { staticPath } from '@/shared/lib/$path';

import { DEFAULT_LOCALE, SUPPORTED_LANGUAGES } from '../i18n';
import { APP_TITLE, getAlternateHrefLinks, getAppTitle } from './meta';

interface PageSEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const PageSEO = (props: PageSEOProps) => {
  const { asPath } = useRouter();
  const { i18n } = useTranslation();

  const {
    title,
    url = `${process.env.NEXT_PUBLIC_APP_URL}${asPath}`,
    image = staticPath.static.images.logo_og_png,
    description = APP_TITLE,
  } = props;

  const imageURL = image.startsWith('https://') ? image : `${process.env.NEXT_PUBLIC_APP_URL}${image}`;

  return (
    <Head>
      <title>{getAppTitle(title)}</title>

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />

      <meta property="og:title" content={getAppTitle(title)} />
      <meta name="twitter:title" content={getAppTitle(title)} />

      <meta property="og:url" content={url} />
      <meta name="twitter:url" content={url} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />

      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      {image && (
        <>
          <meta name="twitter:image" content={imageURL} />
          <meta property="og:image" content={imageURL} />
        </>
      )}

      <meta property="og:site_name" content={APP_TITLE} />
      <meta property="og:locale" content={i18n.language} />
      <meta property="og:type" content="website" />
      <meta name="twitter:site" content="@devianllert" />
      <meta name="twitter:creator" content="@devianllert" />
      <meta name="keywords" content="nextplate, react" />
      <meta name="author" content="devianllert" />

      {getAlternateHrefLinks({ asPath, locales: SUPPORTED_LANGUAGES })}
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_APP_URL}/${i18n.language === DEFAULT_LOCALE ? '' : i18n.language}${
          asPath === '/' ? '' : asPath
        }`}
      />
    </Head>
  );
};
