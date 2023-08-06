import * as React from 'react';
import NextImage from 'next/image';
import { Box, Heading, Text } from '@effable/react';

export interface DignityProps {
  title: string;
  text?: string;
  icon: string;
}

export const Dignity = (props: DignityProps) => {
  const { title, text, icon } = props;

  return (
    <Box
      display="flex"
      backgroundColor="accent.accent6"
      borderRadius="24px"
      padding={{
        base: '3x',
        desktop: '4x',
      }}
      maxWidth="218px"
      justifyContent="center"
    >
      <Box mr="2x" minWidth={24} minHeight={24}>
        <NextImage alt="tools" src={icon} width={24} height={24} />
      </Box>
      <Box display="flex" flexDirection="column">
        <Heading variant="h3" sx={{ whiteSpace: 'nowrap' }}>
          {title}
        </Heading>

        {text && (
          <Text color="text.secondary" variant="xs">
            {text}
          </Text>
        )}
      </Box>
    </Box>
  );
};
