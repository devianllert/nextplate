import * as React from 'react';

import { Box, Heading, Text } from '@effable/react';

import * as S from './advantage.styled';

export interface AdvantageProps {
  /**
   * The content
   */
  icon: React.ReactNode;
  description: string;
  title;
}

export const Advantage = (props: AdvantageProps): JSX.Element => {
  const { icon, description, title } = props;

  return (
    <Box
      display="flex"
      flexDirection={{
        base: 'row',
        laptop: 'column',
      }}
      maxWidth={{
        base: '100%',
        laptop: '216px',
        desktop: '289px',
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
        alignItems={{
          base: 'flex-start',
          laptop: 'center',
          desktop: 'center',
        }}
        marginLeft={{
          base: '6x',
          laptop: '0px',
          desktop: '0px',
        }}
      >
        <Heading variant="h2" color="text.primary">
          {title}
        </Heading>

        <Text
          variant="m"
          color="text.primary"
          // textAlign={{
          //   base: 'left',
          //   laptop: 'center',
          //   desktop: 'center',
          // }}
          sx={{ marginTop: '12px' }}
        >
          {description}
        </Text>
      </Box>
    </Box>
  );
};
