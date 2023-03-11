import * as React from 'react';

import { Box, Heading, Text } from '@effable/react';

export interface DignityProps {
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
      borderRadius="80px"
      padding={{
        base: '3x',
        desktop: '4x',
      }}
      maxWidth="200px"
      justifyContent="center"
    >
      <Heading color="accent.accent11" variant={main ? 'h1' : 'h3'}>
        {title}
      </Heading>

      {text && (
        <Text color="accent.accent11" variant="xs">
          {text}
        </Text>
      )}
    </Box>
  );
};
