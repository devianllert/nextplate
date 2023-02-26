import * as React from 'react';

import { Box } from '@effable/react';

import { MainLayout } from '@/layouts/main';

import { CookieConsent } from '@/features/cookie-consent';
import { Demos } from '@/features/new-main-page/demos';
import { Hero } from '@/features/new-main-page/hero';
import { WhyNextplate } from '@/features/new-main-page/why-nextplate';

import { PageSEO } from '@/shared/lib/meta';
import { getTranslationsStaticProps } from '@/shared/lib/ssr';
import { EnhancedNextPage } from '@/shared/types/enhanced-next-page';
import { OnlyBrowserPageProps } from '@/shared/types/only-browser-page-props';
import { SSGPageProps } from '@/shared/types/ssg-page-props';
import { SSRPageProps } from '@/shared/types/ssr-page-props';

type IndexPageProps = SSRPageProps & SSGPageProps<OnlyBrowserPageProps>;

export const getStaticProps = getTranslationsStaticProps(['index', 'common']);

const IndexPage: EnhancedNextPage<IndexPageProps> = (): JSX.Element => {
  return (
    <>
      <PageSEO title="Home" description="Ultimate template for Next.js with a pack of incredible tools" />

      <CookieConsent />

      <Box display="flex" flexDirection="column" width="100%">
        <Hero />

        <WhyNextplate />

        <Demos />
      </Box>
    </>
  );
};

IndexPage.Layout = MainLayout;

export default IndexPage;
