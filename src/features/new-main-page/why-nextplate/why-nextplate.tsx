import * as React from 'react';

import { Box, Heading, Container } from '@effable/react';

import { Section } from '@/features/new-main-page/section';
import { Advantage } from '@/features/new-main-page/advantage';

import Performance from '@/shared/icons/performance';
import Best from '@/shared/icons/best-class';
import Built from '@/shared/icons/built-In-demo';
import Feature from '@/shared/icons/feature';

import * as S from './why-nextplate.styled';

export const WhyNextplate = (): JSX.Element => {
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <Heading color="text.primary">
          Why Nextplate?
        </Heading>

        <Box
          display="grid"
          gridTemplateColumns={{
            base: '1fr',
            laptop: '1fr 1fr 1fr 1fr',
            desktop: '1fr 1fr 1fr 1fr',
          }}
          width="100%"
          marginTop="13x"
          gridGap={{
            base: '8x',
            laptop: '0px',
            desktop: '0px',
          }}
        >
          <Advantage
            title="Performant"
            description="Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more"
            icon={<Performance />}
          />

          <Advantage
            title="Feature-rich"
            description="Packed full of useful features like Theming (Theme-ui), CSS-in-JS (Emotion), i18n (next-i18next), Testing (Jest), Logging, Monitoring (Sentry), Storybook and a fully-typed API and much more"
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

        </Box>
      </Box>
    </Container>
  );
};
