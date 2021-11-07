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
} from 'styled-system';

import { transform, TransformProps } from '@/modules/core/css-in-js/transform';
import { shouldForwardProp } from '@/modules/core/css-in-js/shouldForwardProp';

export type BoxType =
  & SpaceProps
  & FlexboxProps
  & LayoutProps
  & PositionProps
  & BackgroundProps
  & BoxShadowProps
  & BorderProps
  & ColorProps
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
