import * as React from 'react';
import { Box, Container } from '@effable/react';

export interface SectionProps {
  /**
   * The content
   */
  children: React.ReactNode;
  backgroundColor?: string;
}

export const Section = (props: SectionProps) => {
  const { children, backgroundColor } = props;

  return (
    <Box
      position="relative"
      py="13x"
      display="flex"
      width="100%"
      justifyContent="center"
      backgroundColor={backgroundColor || 'none'}
    >
      <Container>{children}</Container>
    </Box>
  );
};
