import * as React from 'react';

import { Box } from '@effable/react';

import * as S from './section.styled';

export interface SectionProps {
  /**
   * The content
   */
  children: React.ReactNode;
  backgroundColor?: string;
}

export const Section = (props: SectionProps): JSX.Element => {
  const { children, backgroundColor } = props;

  return (
    <Box display="flex" width="100%" justifyContent="center" backgroundColor={backgroundColor || 'none'}>
      <Box maxWidth="1366px" width="100%" display="flex" paddingX="8x" paddingY="13x">
        {children}
      </Box>
    </Box>
  );
};
