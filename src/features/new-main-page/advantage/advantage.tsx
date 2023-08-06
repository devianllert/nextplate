import * as React from 'react';
import { Box, Heading, Text } from '@effable/react';

import * as S from './advantage.styled';

export interface AdvantageProps {
  /**
   * The content
   */
  icon: React.ReactNode;
  description: React.ReactNode;
  title: string;
}

export const Advantage = (props: AdvantageProps) => {
  const { icon, description, title } = props;

  return (
    <Box
      display="flex"
      flexDirection={{
        base: 'row',
        laptop: 'column',
      }}
      width="100%"
      alignItems={{
        base: 'flex-start',
        laptop: 'center',
        desktop: 'center',
      }}
      justifyContent="flex-start"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minWidth="62px"
        minHeight="62px"
        backgroundColor="accent.accent9"
        color="white"
        borderRadius="16px"
        marginBottom={{
          base: '0px',
          laptop: '6x',
          desktop: '6x',
        }}
      >
        {icon}
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        marginLeft={{
          base: '6x',
          laptop: '0px',
          desktop: '0px',
        }}
      >
        <Heading variant="h2" component="h3" color="text.primary" textAlign={{ base: 'left', laptop: 'center' }}>
          {title}
        </Heading>

        <Text
          variant="m"
          color="text.primary"
          textAlign={{
            base: 'left',
            laptop: 'center',
            desktop: 'center',
          }}
          sx={{ marginTop: '12px' }}
        >
          {description}
        </Text>
      </Box>
    </Box>
  );
};
