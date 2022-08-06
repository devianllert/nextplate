import styled from '@emotion/styled';
import {
  color,
  ColorProps,
  typography,
  TypographyProps,
  display,
  DisplayProps,
} from 'styled-system';

import {
  variants,
  headings,
  paragraphs,
  overlines,
  captions,
} from '@/shared/design/tokens/typography';
import { shouldForwardProp } from '@/shared/lib/css-in-js/should-forward-prop';
import { SxProp, sx } from '@/shared/lib/css-in-js/sx';

export type TypoVariants = keyof typeof variants;

export interface TextBaseProps<Variant extends TypoVariants = TypoVariants> extends SxProp, ColorProps, TypographyProps, DisplayProps {
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   */
  noWrap?: boolean;

  /**
   * The variant to use.
   */
  variant: Variant;
}

export const TextBase = styled('span', { shouldForwardProp })<TextBaseProps<TypoVariants>>(
  (props) => ({
    margin: 0,
    padding: 0,
    textDecoration: 'none',
    fontVariantNumeric: 'tabular-nums',
    color: 'inherit',

    ...(props.noWrap && {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
  }),
);

export const FontRoot = styled(TextBase)<TextBaseProps>(
  color,
  typography,
  display,
  sx,
);

export const HeadingRoot = styled(TextBase)<TextBaseProps<keyof typeof headings>>(
  (props) => ({
    ...headings[props.variant],
  }),
  color,
  typography,
  display,
  sx,
);

export const ParagraphRoot = styled(TextBase)<TextBaseProps<keyof typeof paragraphs>>(
  (props) => ({
    ...paragraphs[props.variant],
  }),
  color,
  typography,
  display,
  sx,
);

export const OverlineRoot = styled(TextBase)<TextBaseProps<keyof typeof overlines>>(
  (props) => ({
    ...overlines[props.variant],
  }),
  color,
  typography,
  display,
  sx,
);

export const CaptionRoot = styled(TextBase)<TextBaseProps<keyof typeof captions>>(
  (props) => ({
    ...captions[props.variant],
  }),
  color,
  typography,
  display,
  sx,
);
