import * as React from 'react';
import { Box, Heading, Stack } from '@effable/react';
import { useTranslation } from 'next-i18next';

import { pagesPath } from '@/shared/lib/$path';

import { DemoItem } from '../demo-item';
import { Section } from '../section';
import { demoApps } from './demos.const';

export const Demos = () => {
  const { t } = useTranslation('index');

  return (
    <Section backgroundColor="accent.accent3">
      <Box display="flex" flexDirection="column" width="100%">
        <Stack direction="column" space="11x" alignItems="center">
          <Box display="flex">
            <Heading color="text.primary" variant="h0" component="h2">
              {t('DEMOS_TITLE')}
            </Heading>
          </Box>

          {demoApps.map((app) => (
            <DemoItem
              key={app.title}
              link={app.link}
              title={app.title}
              preview={app.image}
              description={t(app.description)}
            />
          ))}
        </Stack>
      </Box>
    </Section>
  );
};
