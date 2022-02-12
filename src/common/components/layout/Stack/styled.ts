import * as React from 'react';
import styled from '@emotion/styled';
import { system, ResponsiveValue } from 'styled-system';

import { getSpace } from '@/modules/core/css-in-js/getters';
import { spacings } from '@/common/design/tokens/spacings';

export interface StackRootProps {
  marginLeft: ResponsiveValue<number>;
  marginTop: ResponsiveValue<number>;
  alignY: ResponsiveValue<React.CSSProperties['alignItems']>;
  flexDirection: ResponsiveValue<React.CSSProperties['flexDirection']>;
}

const stackRootCustomProps = system({
  alignY: {
    property: 'alignItems',
    scale: 'alignY',
  },
  marginLeft: {
    property: 'marginLeft',
    scale: 'space',
    defaultScale: spacings,
    transform: (n: number | string, scale = spacings) => -getSpace(scale, n),
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

const stackBoxCustomProps = system({
  space: {
    properties: ['marginLeft', 'marginTop'],
    scale: 'space',
    defaultScale: spacings,
  },
});

export const StackBox = styled.div<InlineBoxProps>(
  {
    minWidth: 0,
  },
  stackBoxCustomProps,
);

export interface InlineRootAlignerProps {
  space: ResponsiveValue<number>;
}

const inlineRootAlignerCustomProps = system({
  space: {
    property: 'marginTop',
    scale: 'space',
    defaultScale: spacings,
    transform: (n: number | string, scale = spacings) => -getSpace(scale, n),
  },
});

export const StackRootAligner = styled.div<InlineRootAlignerProps>((props) => ({
  padding: 0,
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
