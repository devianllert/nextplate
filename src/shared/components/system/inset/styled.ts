import styled from '@emotion/styled';
import { system, ResponsiveValue } from 'styled-system';

export interface InsetRootProps {
  space?: ResponsiveValue<number>;
  vertical?: ResponsiveValue<number>;
  horizontal?: ResponsiveValue<number>;
}

const insetSystem = system({
  horizontal: {
    properties: ['paddingLeft', 'paddingRight'],
    scale: 'space',
  },
  vertical: {
    properties: ['paddingTop', 'paddingBottom'],
    scale: 'space',
  },
  space: {
    property: 'padding',
    scale: 'space',
  },
});

export const InsetRoot = styled.div<InsetRootProps>(insetSystem);
