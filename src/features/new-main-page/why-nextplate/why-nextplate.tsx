import * as React from 'react';
import { Box, Code, Container, Heading, SimpleGrid } from '@effable/react';
import { Trans, useTranslation } from 'next-i18next';
import { RiEyeFill, RiFlashlightFill, RiSettings3Fill, RiStarFill } from 'react-icons/ri';

import { Advantage } from '@/features/new-main-page/advantage';

export const WhyNextplate = () => {
  const { t } = useTranslation(['index', 'common']);

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" width="100%" paddingY="13x">
        <Heading color="text.primary" variant="h0" component="h2" sx={{ mb: '11x' }}>
          {t('FEATURES_TITLE')}
        </Heading>

        <SimpleGrid cols={{ base: 1, laptop: 4 }} space="11x">
          <Advantage
            title={t('FEATURES_PERFORMANT_TITLE')}
            description={t('FEATURES_PERFORMANT_DESCRIPTION')}
            icon={<RiFlashlightFill size={24} />}
          />

          <Advantage
            title={t('FEATURES_RICH_TITLE')}
            description={<Trans t={t} i18nKey="FEATURES_RICH_DESCRIPTION" components={[<Code key="code" />]} />}
            icon={<RiSettings3Fill size={24} />}
          />

          <Advantage
            title={t('FEATURES_DX_TITLE')}
            description={t('FEATURES_DX_DESCRIPTION')}
            icon={<RiStarFill size={24} />}
          />

          <Advantage
            title={t('FEATURES_APPS_TITLE')}
            description={t('FEATURES_APPS_DESCRIPTION')}
            icon={<RiEyeFill size={24} />}
          />
        </SimpleGrid>
      </Box>
    </Container>
  );
};
