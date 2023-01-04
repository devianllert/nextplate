import * as React from 'react';

import { Box, Heading, Stack } from '@effable/react';

import { DemoItem } from '../demo-item';

import * as S from './demos.styled';
import { Section } from '../section';

export const Demos = (): JSX.Element => {
  return (
    <Section>
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
      >
        <Stack
          direction="column"
          space="11x"
        >
          <Box
            display="flex"
            alignSelf="center"
          >
            <Heading>
              Some features demo
            </Heading>
          </Box>

          <DemoItem
            title="Authorization"
            preview="123"
            description="A full-fledged authorization flow with registration and login, as well as a password recovery function. It is also possible to register / login through third-party services (Google, Twitter, Apple, Github).
  After Login, you can view your profile, change information about it, change your password, etc.
  Also, when changing the page from login to registration and back, there is a clear example of transition animations. Field validation, error handling from the server."
          />

          <DemoItem
            title="Weather"
            preview="123"
            description="Shows the basic work with getting data from a third-party api and its further display in pages."
          />
        </Stack>

      </Box>
    </Section>
  );
};
