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
      backgroundColor="#D7CFF9"
      borderRadius="16px"
      padding={['16px']}
      maxWidth="200px"
    >
      <Heading color="#5746AF" variant={main ? 'h1' : 'h3'}>
        {title}
      </Heading>

      {text && (
      <Text color="#5746AF" variant="m" sx={{ marginTop: '2x' }}>
        {text}
      </Text>
      )}
    </Box>
  );
};
