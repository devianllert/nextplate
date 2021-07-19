import * as React from 'react';
import styled from '@emotion/styled';

import { fontWeight, variants } from '@/common/design/tokens/typography';

export type TypoVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'button'
  | 'overline'
  | 'caption';

export type TypoAlign = 'inherit' | 'left' | 'center' | 'right' | 'justify';

export type TypoWeight = 'light' | 'normal' | 'medium' | 'bold' | 'heavy';

interface TypoProps {
  align: React.CSSProperties['textAlign'];
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  variant?: TypoVariant;
  variantMapping?: Partial<Record<TypoVariant, string>>;
  color?: string;
  fontWeight?: TypoWeight;
  display: React.CSSProperties['display'];
}

export const Typo = styled.span<TypoProps>((props) => ({
  margin: 0,
  display: props.display,
  color: props.theme.colors.textColors[props.color] ?? props.theme.colors.status[props.color] ?? props.color,
  textAlign: props.align,
  textDecoration: 'none',
  ...(props.noWrap && {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  marginBottom: (props.gutterBottom && '0.35em') || (props.paragraph && '16px'),
  ...variants[props.variant],
  ...(props.fontWeight && {
    fontWeight: fontWeight[props.fontWeight],
  }),
}));
