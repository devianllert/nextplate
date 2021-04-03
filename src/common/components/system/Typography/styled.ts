import styled from 'styled-components';

import * as typo from '@/common/design/tokens/typo';

export type TypoVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'subtitle1'
  | 'subtitle2'
  | 'subtitle3'
  | 'subtitle4'
  | 'subtitle5'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption1'
  | 'caption2'
  | 'overline';

type TypoAlign = 'inherit' | 'left' | 'center' | 'right' | 'justify';

interface TypoProps {
  align: TypoAlign;
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  variant?: TypoVariant;
  variantMapping?: Partial<Record<TypoVariant, string>>;
  color?: string;
  display: 'initial' | 'block' | 'inline';
}

export const Typo = styled.span<TypoProps>`
  margin: 0;

  color: ${({ color }) => color};

  ${({ display }): string | false => display !== 'initial' && `display: ${display};`};

  text-align: ${({ align }): TypoAlign => align};

  ${({ noWrap }): string | undefined | false => noWrap && `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}

  ${({ gutterBottom }): string | undefined | false => gutterBottom && 'margin-bottom: 0.35em;'}

  ${({ paragraph }): string | undefined | false => paragraph && 'margin-bottom: 16px;'}

  ${({ variant = 'body1' }): string => typo[variant]}
`;
