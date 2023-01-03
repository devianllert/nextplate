import * as React from 'react';

import { Box, Text, Heading } from '@effable/react';

import * as S from './advantage.styled';

export interface AdvantageProps {
  /**
   * The content
   */
  icon: React.ReactNode;
  description: string;
  title,
}

export const Advantage = (props: AdvantageProps): JSX.Element => {
  const {
    icon,
    description,
    title,
  } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="62px"
        height="62px"
        backgroundColor="#6E56CF"
      >
        {icon}
      </Box>

      <Box
        marginTop={['6x']}
      >
        <Heading variant="h2">
          {title}
        </Heading>
      </Box>

      <Box
        marginTop={['3x']}
      >
        <Text variant="m">
          {description}
        </Text>
      </Box>
    </Box>
  );
};
