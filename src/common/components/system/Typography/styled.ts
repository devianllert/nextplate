import * as React from 'react';
import styled from '@emotion/styled';

import { fontWeight, variants } from '@/common/design/tokens/typography';
import { margin, padding, SpaceProps } from '@/modules/core/css-in-js/space';

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

interface TypoProps extends SpaceProps {
  align: React.CSSProperties['textAlign'];
  noWrap?: boolean;
  variant: TypoVariant;
  variantMapping?: Partial<Record<TypoVariant, string>>;
  color: string;
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
  ...variants[props.variant],
  ...(props.fontWeight && {
    fontWeight: fontWeight[props.fontWeight],
  }),
  ...(margin(props)),
  ...(padding(props)),
}));
