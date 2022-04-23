import styled from '@emotion/styled';
import {
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
} from 'styled-system';

export const FlexRoot = styled.div<FlexboxProps & LayoutProps>(
  {
    boxSizing: 'border-box',
    display: 'flex',
  },
  flexbox,
  layout,
);
