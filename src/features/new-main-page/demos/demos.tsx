import * as React from 'react';

import { Box, Heading, Stack } from '@effable/react';

import { pagesPath } from '@/shared/lib/$path';

import { DemoItem } from '../demo-item';
import { Section } from '../section';

export const Demos = (): JSX.Element => {
  return (
    <Section backgroundColor="accent.accent3">
      <Box display="flex" flexDirection="column" width="100%">
        <Stack direction="column" space="11x" alignItems="center">
          <Box display="flex">
            <Heading color="text.primary">Some features demo</Heading>
          </Box>

          <DemoItem
            link={pagesPath.auth.login.$url()}
            title="Authorization"
            preview="/static/images/apps/en/auth.png"
            description="Full-featured dashboard app with authentication, refresh token rotation, password recovery and etc.
Also shows how to handle form validation, page transitions."
          />

          <DemoItem
            link={pagesPath.weather.$url()}
            title="Weather"
            preview="/static/images/apps/weather.png"
            description="Shows the basic work with getting data from a third-party api and its further display in pages."
          />
        </Stack>
      </Box>
    </Section>
  );
};
