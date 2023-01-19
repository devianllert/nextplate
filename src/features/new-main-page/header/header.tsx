import * as React from 'react';

import {
  Box,
  Text,
  Heading,
  Button,
  Stack,
  Container,
} from '@effable/react';

import { DignityGrid } from '@/features/new-main-page/dignity-grid';
import { Section } from '@/features/new-main-page/section';

import * as S from './header.styled';

export const Header = (): JSX.Element => {
  return (
    <Section
      backgroundColor="accent.accent3"
    >
      <Box
        display="grid"
        gridTemplateColumns={{
          base: '1fr',
          laptop: '1fr 1fr',
        }}
        gridGap="11x"
        marginLeft={{
          base: '0px',
          tablet: '12x',
        }}
      >
        <Box
          maxWidth={{
            base: '100%',
            tablet: '534px',
            laptop: '514px',
            desktop: '514px',
          }}
          display="flex"
          flexDirection="column"
        >
          <Heading variant="h0" color="text.primary">
            Nextplate. Template
            with all you need.
          </Heading>

          <Box
            display="flex"
            mt="4x"
          >
            <Text
              variant="m"
              color="text.primary"
            >
              Aims for developers who really care about code quality, architecture, security and all the best practices in frontend
            </Text>
          </Box>

          <Box
            display="flex"
            mt="68px"
          >
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
              // sx={{ width: '100% ' }}
            >
              <Button
                size="large"
              >
                Documentation
              </Button>

              <Button
                size="large"
                variant="secondary"
              >
                Github
              </Button>
            </Stack>
          </Box>
        </Box>

        <DignityGrid />
      </Box>
    </Section>
  );
};
