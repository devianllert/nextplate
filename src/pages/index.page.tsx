import * as React from 'react';
import { Box } from '@effable/react';
import { useTranslation } from 'next-i18next';

import { MainLayout } from '@/layouts/main';

import { CookieConsent } from '@/features/cookie-consent';
import { Demos } from '@/features/new-main-page/demos';
import { Hero } from '@/features/new-main-page/hero';
import { WhyNextplate } from '@/features/new-main-page/why-nextplate';

import { PageSEO } from '@/shared/lib/meta';
import { getTranslationsStaticProps } from '@/shared/lib/ssr';
import { EnhancedNextPage } from '@/shared/types/enhanced-next-page';
import { SSGPageProps } from '@/shared/types/ssg-page-props';

type IndexPageProps = SSGPageProps;

export const getStaticProps = getTranslationsStaticProps(['index', 'common']);

const IndexPage: EnhancedNextPage<IndexPageProps> = () => {
  const { t } = useTranslation(['index', 'common']);

  return (
    <>
      <PageSEO title={t('SEO_TITLE')} description={t('SEO_DESCRIPTION')} />

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
