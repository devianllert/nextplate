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
      maxWidth="289px"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="62px"
        height="62px"
        backgroundColor="#6E56CF"
        borderRadius="16px"
      >
        {icon}
      </Box>

      <Heading variant="h2" fontSize="24px" color="#20134B" sx={{ marginTop: '24px' }}>
        {title}
      </Heading>

      <Text variant="m" color="#20134B" fontSize="16px" textAlign="center" sx={{ marginTop: '12px' }}>
        {description}
      </Text>
    </Box>
  );
};
