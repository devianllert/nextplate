import * as React from 'react';
import { Box, Button, Heading, SimpleGrid, Stack, Text } from '@effable/react';
import { useTranslation } from 'next-i18next';

import { DignityGrid } from '@/features/new-main-page/dignity-grid';
import { Section } from '@/features/new-main-page/section';

export const Hero = () => {
  const { t } = useTranslation(['index']);

  return (
    <Box
      display="flex"
      minHeight={{
        base: 500,
        desktop: 626,
      }}
    >
      <Section backgroundColor="accent.accent3">
        <Box px={{ base: 'none', tablet: '12x', laptop: '15x' }}>
          <SimpleGrid cols={{ base: 1, laptop: 2 }} space="8x">
            <Box display="flex" flexDirection="column" alignSelf="center">
              <Heading variant="h0" color="text.primary" sx={{ maxWidth: '16ch' }}>
                {t('HERO_TITLE')}
              </Heading>

              <Box display="flex" mt="4x">
                <Text variant="m" color="text.primary" sx={{ maxWidth: '48ch' }}>
                  {t('HERO_SUBTITLE')}
                </Text>
              </Box>

              <Box display="flex" mt="11x">
                <Stack
                  direction={{
                    base: 'column',
                    desktop: 'row',
                    tablet: 'row',
                  }}
                  space={{
                    base: '4x',
                    desktop: '6x',
                  }}
                  alignItems="stretch"
                  sx={{ width: '100%' }}
                >
                  <Button size="large" disabled>
                    {t('HERO_DOCUMENTATION')}
                  </Button>

                  <Button
                    size="large"
                    variant="secondary"
                    href="https://github.com/devianllert/nextplate"
                    component="a"
                    target="_blank"
                  >
                    Github
                  </Button>
                </Stack>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" justifyContent="center">
              <DignityGrid />
            </Box>
          </SimpleGrid>
        </Box>

        <Box position="absolute" left={0} bottom={-1} width="100%" color="background.primary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 64">
            <path fill="currentColor" fillOpacity="1" d="M0,0L720,64L1440,0L1440,64L720,64L0,64Z" />
          </svg>
        </Box>
      </Section>
    </Box>
  );
};
