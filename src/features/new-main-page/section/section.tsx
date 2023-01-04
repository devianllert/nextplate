import * as React from 'react';

import { Box } from '@effable/react';

import * as S from './section.styled';

export interface SectionProps {
  /**
   * The content
   */
  children: React.ReactNode;
}

export const Section = (props: SectionProps): JSX.Element => {
  const {
    children,
  } = props;

  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="center"
    >
      <Box
        maxWidth="1366px"
        width="100%"
        display="flex"
        paddingX="8x"
        paddingY="13x"
      >
        {children}
      </Box>
    </Box>
  );
};
