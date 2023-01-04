import * as React from 'react';

import {
  Box,
  Text,
  Heading,
} from '@effable/react';

import { DignityGrid } from '@/features/new-main-page/dignity-grid';
import { Section } from '@/features/new-main-page/section';

import * as S from './header.styled';

export const Header = (): JSX.Element => {
  return (
    <Section>
      <Box
        display="flex"
        width="100%"
        justifyContent="space-evenly"
      >
        <Box
          maxWidth="514px"
        >
          <Heading variant="h0" fontSize="48px" color="#20134B">
            Nextplate. Template
            with all you need.
          </Heading>

          <Box
            display="flex"
            mt="4x"
          >
            <Text
              fontSize="16px"
              color="#20134B"
            >
              Aims for developers who really care about code quality, architecture, security and all the best practices in frontend
            </Text>
          </Box>
        </Box>

        <DignityGrid />
      </Box>
    </Section>
  );
};
