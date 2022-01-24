import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { APP_TITLE, getAppTitle } from './meta';

export interface PageSEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  children?: React.ReactNode;
}

export const PageSEO = (props: PageSEOProps) => {
  const router = useRouter();

  const {
    title,
    url = `${process.env.NEXT_PUBLIC_APP_URL}${router.asPath}`,
    image = '/static/images/logo-og.png',
    description = APP_TITLE,
  } = props;

  const imageURL = image.startsWith('https://') ? image : `${process.env.NEXT_PUBLIC_APP_URL}${image}`;

  return (
    <Head>
      <title>{getAppTitle(title)}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={getAppTitle(title)} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:site" content="@devianllert" />
      <meta name="twitter:creator" content="@devianllert" />
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      {image && (
        <meta property="og:image" content={imageURL} />
      )}
    </Head>
  );
};
