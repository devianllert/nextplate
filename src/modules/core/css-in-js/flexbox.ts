import { CSSProperties } from 'react';

import { createSystem, ResponsiveValue } from './system';

export interface FlexboxProps {
  alignItems?: ResponsiveValue<CSSProperties['alignItems']>;
  alignContent?: ResponsiveValue<CSSProperties['alignContent']>;
  justifyItems?: ResponsiveValue<CSSProperties['justifyItems']>;
  justifyContent?: ResponsiveValue<CSSProperties['justifyContent']>;
  flexWrap?: ResponsiveValue<CSSProperties['flexWrap']>;
  flexDirection?: ResponsiveValue<CSSProperties['flexDirection']>;
  flex?: ResponsiveValue<CSSProperties['flex']>;
  flexGrow?: ResponsiveValue<CSSProperties['flexGrow']>;
  flexShrink?: ResponsiveValue<CSSProperties['flexShrink']>;
  flexBasis?: ResponsiveValue<CSSProperties['flexBasis']>;
  justifySelf?: ResponsiveValue<CSSProperties['justifySelf']>;
  alignSelf?: ResponsiveValue<CSSProperties['alignSelf']>;
  order?: ResponsiveValue<CSSProperties['order']>;
}

const config = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: true,
  justifySelf: true,
  alignSelf: true,
  order: true,
};

export const flexbox = createSystem(config);
