import * as React from 'react';

import { Box, Heading, Text } from '@effable/react';

import * as S from './dignity.styled';

export interface DignityProps {
  /**
   * The content
   */
  title: string;
  text?: string;
  main? : boolean;
}

export const Dignity = (props: DignityProps): JSX.Element => {
  const {
    title,
    text,
    main,
  } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      backgroundColor="accent.accent6"
      borderRadius="16px"
      padding="16px"
      maxWidth="200px"
      justifyContent="center"
    >
      <Heading color="accent.accent11" variant={main ? 'h1' : 'h3'}>
        {title}
      </Heading>

      {text && (
      <Text color="accent.accent11" variant="m" sx={{ marginTop: '2x' }}>
        {text}
      </Text>
      )}
    </Box>
  );
};
