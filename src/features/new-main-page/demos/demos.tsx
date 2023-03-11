import * as React from 'react';

import { Box, Heading, Stack } from '@effable/react';
import { useTranslation } from 'next-i18next';

import { pagesPath } from '@/shared/lib/$path';

import { DemoItem } from '../demo-item';
import { Section } from '../section';

export const Demos = (): JSX.Element => {
  const { t } = useTranslation('index');

  return (
    <Section backgroundColor="accent.accent3">
      <Box display="flex" flexDirection="column" width="100%">
        <Stack direction="column" space="11x" alignItems="center">
          <Box display="flex">
            <Heading color="text.primary">{t('DEMOS_TITLE')}</Heading>
          </Box>

          <DemoItem
            link={pagesPath.auth.login.$url()}
            title="Authorization"
            preview="/static/images/apps/en/auth.png"
            description={t('DEMOS_AUTH_DESCRIPTION')}
          />

          <DemoItem
            link={pagesPath.weather.$url()}
            title="Weather"
            preview="/static/images/apps/weather.png"
            description={t('DEMOS_WEATHER_DESCRIPTION')}
          />

          <DemoItem
            link={pagesPath.weather.$url()}
            title="Password Generator"
            preview="https://placehold.co/1024x600.png?text=Soon"
            description={t('DEMOS_PASSWORD_DESCRIPTION')}
            available={false}
          />
        </Stack>
      </Box>
    </Section>
  );
};
