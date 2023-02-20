import * as React from 'react';

import {
  Box, Container, Heading, SimpleGrid,
} from '@effable/react';

import { Advantage } from '@/features/new-main-page/advantage';

import Best from '@/shared/icons/best-class';
import Built from '@/shared/icons/built-In-demo';
import Feature from '@/shared/icons/feature';
import Performance from '@/shared/icons/performance';

export const WhyNextplate = (): JSX.Element => {
  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" width="100%" paddingY="13x">
        <Heading color="text.primary" sx={{ mb: '11x' }}>
          Why Nextplate?
        </Heading>

        <SimpleGrid cols={{ base: 1, laptop: 4 }} space="11x">
          <Advantage
            title="Performant"
            description="Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more"
            icon={<Performance />}
          />

          <Advantage
            title="Feature-rich"
            description="Packed full of useful features like i18n (next-i18next), Testing (Jest), Logging, Monitoring (Sentry), Storybook, fully-typed API and much more"
            icon={<Feature />}
          />

          <Advantage
            title="Best-in-class DX"
            description="This boilerplate is meant for developers with basic skills in React, who are looking for a way of building production-grade web applications"
            icon={<Best />}
          />

          <Advantage
            title="Built-in demo apps"
            description="This boilerplate has several built-in demo apps that show an example of using the features of this template"
            icon={<Built />}
          />
        </SimpleGrid>
      </Box>
    </Container>
  );
};
