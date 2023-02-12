import * as React from 'react';

import {
  Box, Heading, Stack, Text,
} from '@effable/react';

import * as S from './dignity.styled';

export interface DignityProps {
  /**
   * The content
   */
  title: string;
  text?: string;
  main?: boolean;
}

export const Dignity = (props: DignityProps): JSX.Element => {
  const { title, text, main } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      backgroundColor="accent.accent6"
      borderRadius="16px"
      padding={{
        base: '2x',
        desktop: '4x',
      }}
      maxWidth="200px"
      justifyContent="center"
    >
      <Stack
        direction="column"
        space={{
          base: '1x',
          desktop: '2x',
        }}
      >
        <Heading color="accent.accent11" variant={main ? 'h1' : 'h3'}>
          {title}
        </Heading>

        {text && (
          <Text color="accent.accent11" variant="s">
            {text}
          </Text>
        )}
      </Stack>
    </Box>
  );
};
