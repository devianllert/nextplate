import * as React from 'react';
import styled from '@emotion/styled';

import { createSystem, ResponsiveValue } from '@/modules/core/css-in-js/system';
import { getSpace } from '@/modules/core/css-in-js/getters';
import { spacings } from '@/common/design/tokens/spacings';

export interface StackRootProps {
  marginLeft: ResponsiveValue<number>;
  marginTop: ResponsiveValue<number>;
  alignY: ResponsiveValue<React.CSSProperties['alignItems']>;
  flexDirection: ResponsiveValue<React.CSSProperties['flexDirection']>;
}

const stackRootCustomProps = createSystem({
  alignY: {
    properties: ['alignItems'],
    scale: 'alignY',
  },
  marginLeft: {
    properties: ['marginLeft'],
    scale: 'space',
    defaultScale: spacings,
    transform: (scale, n) => -getSpace(scale, n) - 1,
  },
  flexDirection: true,
});

export const StackRoot = styled.div<StackRootProps>(
  {
    display: 'flex',
    flexWrap: 'wrap',
  },
  stackRootCustomProps,
);

export interface InlineBoxProps {
  space: ResponsiveValue<number>;
}

const stackBoxCustomProps = createSystem({
  space: {
    properties: ['marginLeft', 'marginTop'],
    scale: 'space',
    defaultScale: spacings,
  },
});

export const StackBox = styled.div<InlineBoxProps>(
  {
    display: 'flex',
    minWidth: 0,
  },
  stackBoxCustomProps,
);

export interface InlineRootAlignerProps {
  space: ResponsiveValue<number>;
}

const inlineRootAlignerCustomProps = createSystem({
  space: {
    properties: ['marginTop'],
    scale: 'space',
    defaultScale: spacings,
    transform: (scale, n) => -getSpace(scale, n) - 1,
  },
});

export const StackRootAligner = styled.div<InlineRootAlignerProps>((props) => ({
  padding: 0,
  paddingTop: 1,
  margin: 0,
  border: 0,
  boxSizing: 'border-box',
  verticalAlign: 'baseline',
  WebkitTapHighlightColor: 'transparent',

  '&:before': {
    content: '""',
    display: 'block',
    ...(inlineRootAlignerCustomProps(props)),
  },
}));
