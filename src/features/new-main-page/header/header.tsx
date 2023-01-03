import * as React from 'react';

import {
  Box,
  Text,
  Heading,
} from '@effable/react';

import * as S from './header.styled';

export const Header = (): JSX.Element => {
  return (
    <Box
      display="flex"
      width="100%"
    >
      <Box
        maxWidth="514px"
      >
        <Heading variant="h0">
          Nextplate. Template
          with all you need.
        </Heading>

        <Text
          sx={{ marginTop: '16px' }}
        >
          Aims for developers who really care about code quality, architecture, security and all the best practices in frontend
        </Text>
      </Box>
    </Box>
  );
};
