import styled from '@emotion/styled';

import { space, SpaceProps } from '@/modules/core/css-in-js/space';
import { flexbox, FlexboxProps } from '@/modules/core/css-in-js/flexbox';
import { layout, LayoutProps } from '@/modules/core/css-in-js/layout';
import { position, PositionProps } from '@/modules/core/css-in-js/position';
import { background, BackgroundProps } from '@/modules/core/css-in-js/background';
import { boxShadow, BoxShadowProps } from '@/modules/core/css-in-js/boxShadow';
import { border, BorderProps } from '@/modules/core/css-in-js/border';
import { color, ColorProps } from '@/modules/core/css-in-js/colors';
import { shouldForwardProp } from '@/modules/core/css-in-js/shouldForwardProp';

export type BoxType =
  & SpaceProps
  & FlexboxProps
  & LayoutProps
  & PositionProps
  & BackgroundProps
  & BoxShadowProps
  & BorderProps
  & ColorProps;

export const BoxRoot = styled('div', { shouldForwardProp })<BoxType>((props) => ({
  ...(space(props)),
  ...(flexbox(props)),
  ...(layout(props)),
  ...(position(props)),
  ...(background(props)),
  ...(boxShadow(props)),
  ...(border(props)),
  ...(color(props)),
}));
