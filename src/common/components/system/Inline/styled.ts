import * as React from 'react';
import styled from '@emotion/styled';

import { createSystem, ResponsiveValue } from '@/modules/core/css-in-js/system';
import { getSpace } from '@/modules/core/css-in-js/getters';
import { spacings } from '@/common/design/tokens/spacings';

export interface InlineRootProps {
  marginLeft: ResponsiveValue<number>;
  marginTop: ResponsiveValue<number>;
  alignY: ResponsiveValue<React.CSSProperties['alignItems']>;
}

const inlineRootCustomProps = createSystem({
  alignY: {
    properties: ['alignItems'],
    scale: 'alignY',
  },
  marginLeft: {
    properties: ['marginLeft'],
    scale: 'space',
    defaultScale: spacings,
    transform: getSpace,
  },
});

export const InlineRoot = styled.div<InlineRootProps>((props) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',

  ...(inlineRootCustomProps(props)),
}));

export interface InlineBoxProps {
  space: ResponsiveValue<number>;
}

const inlineBoxCustomProps = createSystem({
  space: {
    properties: ['marginLeft', 'marginTop'],
    scale: 'space',
    defaultScale: spacings,
  },
});

export const InlineBox = styled.div<InlineBoxProps>((props) => ({
  display: 'flex',
  minWidth: 0,

  ...(inlineBoxCustomProps(props)),
}));

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

export const InlineRootAligner = styled.div<InlineRootAlignerProps>((props) => ({
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
