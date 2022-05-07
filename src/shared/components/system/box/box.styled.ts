import styled from '@emotion/styled';
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  boxShadow,
  BoxShadowProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  grid,
  GridProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  Theme,
} from 'styled-system';

import { transform, TransformProps } from '@/shared/lib/css-in-js/transform';
import { shouldForwardProp } from '@/shared/lib/css-in-js/should-forward-prop';
import { FlattenedColorKeys } from '@/shared/lib/theming/types/theme.interface';
import { LiteralUnion } from '@/shared/types/literal-union';

export type BoxType =
  & SpaceProps
  & FlexboxProps
  & LayoutProps
  & PositionProps
  & BackgroundProps
  & BoxShadowProps
  & BorderProps
  & ColorProps<Theme, LiteralUnion<FlattenedColorKeys, string>>
  & TransformProps
  & GridProps;

export const BoxRoot = styled('div', { shouldForwardProp })<BoxType>(
  space,
  flexbox,
  layout,
  position,
  background,
  boxShadow,
  border,
  color,
  grid,
  transform,
);
