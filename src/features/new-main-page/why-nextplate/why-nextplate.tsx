import * as React from 'react';

import {
  Box, Container, Heading, SimpleGrid,
} from '@effable/react';
import { useTranslation } from 'next-i18next';

import { Advantage } from '@/features/new-main-page/advantage';

import Best from '@/shared/icons/best-class';
import Built from '@/shared/icons/built-In-demo';
import Feature from '@/shared/icons/feature';
import Performance from '@/shared/icons/performance';

export const WhyNextplate = (): JSX.Element => {
  const { t } = useTranslation(['index', 'common']);

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" width="100%" paddingY="13x">
        <Heading color="text.primary" sx={{ mb: '11x' }}>
          {t('FEATURES_TITLE')}
        </Heading>

        <SimpleGrid cols={{ base: 1, laptop: 4 }} space="11x">
          <Advantage
            title={t('FEATURES_PERFORMANT_TITLE')}
            description={t('FEATURES_PERFORMANT_DESCRIPTION')}
            icon={<Performance />}
          />

          <Advantage title={t('FEATURES_RICH_TITLE')} description={t('FEATURES_RICH_DESCRIPTION')} icon={<Feature />} />

          <Advantage title={t('FEATURES_DX_TITLE')} description={t('FEATURES_DX_DESCRIPTION')} icon={<Best />} />

          <Advantage title={t('FEATURES_APPS_TITLE')} description={t('FEATURES_APPS_DESCRIPTION')} icon={<Built />} />
        </SimpleGrid>
      </Box>
    </Container>
  );
};
