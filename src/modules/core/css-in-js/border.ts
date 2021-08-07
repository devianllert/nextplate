import { CSSProperties } from 'react';

import { createSystem, ResponsiveValue } from './system';

export interface BorderProps {
  border?: ResponsiveValue<CSSProperties['border']>;
  borderWidth?: ResponsiveValue<CSSProperties['borderWidth']>;
  borderStyle?: ResponsiveValue<CSSProperties['borderStyle']>;
  borderColor?: ResponsiveValue<CSSProperties['borderColor']>;
  borderRadius?: ResponsiveValue<CSSProperties['borderRadius']>;
  borderTop?: ResponsiveValue<CSSProperties['borderTop']>;
  borderTopLeftRadius?: ResponsiveValue<CSSProperties['borderTopLeftRadius']>;
  borderTopRightRadius?: ResponsiveValue<CSSProperties['borderTopRightRadius']>;
  borderRight?: ResponsiveValue<CSSProperties['borderRight']>;
  borderBottom?: ResponsiveValue<CSSProperties['borderBottom']>;
  borderBottomLeftRadius?: ResponsiveValue<CSSProperties['borderBottomLeftRadius']>;
  borderBottomRightRadius?: ResponsiveValue<CSSProperties['borderBottomRightRadius']>;
  borderLeft?: ResponsiveValue<CSSProperties['borderLeft']>;
  borderX?: ResponsiveValue<CSSProperties['borderRight']>;
  borderY?: ResponsiveValue<CSSProperties['borderTop']>;
  borderTopWidth?: ResponsiveValue<CSSProperties['borderTopWidth']>;
  borderTopColor?: ResponsiveValue<CSSProperties['borderTopColor']>;
  borderTopStyle?: ResponsiveValue<CSSProperties['borderTopStyle']>;
  borderBottomWidth?: ResponsiveValue<CSSProperties['borderBottomWidth']>;
  borderBottomColor?: ResponsiveValue<CSSProperties['borderBottomColor']>;
  borderBottomStyle?: ResponsiveValue<CSSProperties['borderBottomStyle']>;
  borderLeftWidth?: ResponsiveValue<CSSProperties['borderLeftWidth']>;
  borderLeftColor?: ResponsiveValue<CSSProperties['borderLeftColor']>;
  borderLeftStyle?: ResponsiveValue<CSSProperties['borderLeftStyle']>;
  borderRightWidth?: ResponsiveValue<CSSProperties['borderRightWidth']>;
  borderRightColor?: ResponsiveValue<CSSProperties['borderRightColor']>;
  borderRightStyle?: ResponsiveValue<CSSProperties['borderRightStyle']>;
}

const config: Record<string, any> = {
  border: {
    properties: ['border'],
    scale: 'borders',
  },
  borderWidth: {
    properties: ['borderWidth'],
    scale: 'borderWidths',
  },
  borderStyle: {
    properties: ['borderStyle'],
    scale: 'borderStyles',
  },
  borderColor: {
    properties: ['borderColor'],
    scale: 'colors',
  },
  borderRadius: {
    properties: ['borderRadius'],
    scale: 'radii',
  },
  borderTop: {
    properties: 'borderTop',
    scale: 'borders',
  },
  borderTopLeftRadius: {
    properties: ['borderTopLeftRadius'],
    scale: 'radii',
  },
  borderTopRightRadius: {
    properties: ['borderTopRightRadius'],
    scale: 'radii',
  },
  borderRight: {
    properties: ['borderRight'],
    scale: 'borders',
  },
  borderBottom: {
    properties: ['borderBottom'],
    scale: 'borders',
  },
  borderBottomLeftRadius: {
    properties: ['borderBottomLeftRadius'],
    scale: 'radii',
  },
  borderBottomRightRadius: {
    properties: ['borderBottomRightRadius'],
    scale: 'radii',
  },
  borderLeft: {
    properties: ['borderLeft'],
    scale: 'borders',
  },
  borderX: {
    properties: ['borderLeft', 'borderRight'],
    scale: 'borders',
  },
  borderY: {
    properties: ['borderTop', 'borderBottom'],
    scale: 'borders',
  },
};

config.borderTopWidth = {
  properties: ['borderTopWidth'],
  scale: 'borderWidths',
};

config.borderTopColor = {
  properties: ['borderTopColor'],
  scale: 'colors',
};
config.borderTopStyle = {
  properties: ['borderTopStyle'],
  scale: 'borderStyles',
};
config.borderTopLeftRadius = {
  properties: ['borderTopLeftRadius'],
  scale: 'radii',
};
config.borderTopRightRadius = {
  properties: ['borderTopRightRadius'],
  scale: 'radii',
};
config.borderBottomWidth = {
  properties: ['borderBottomWidth'],
  scale: 'borderWidths',
};
config.borderBottomColor = {
  properties: ['borderBottomColor'],
  scale: 'colors',
};
config.borderBottomStyle = {
  properties: ['borderBottomStyle'],
  scale: 'borderStyles',
};
config.borderLeftWidth = {
  properties: ['borderLeftWidth'],
  scale: 'borderWidths',
};
config.borderLeftColor = {
  properties: ['borderLeftColor'],
  scale: 'colors',
};
config.borderLeftStyle = {
  properties: ['borderLeftStyle'],
  scale: 'borderStyles',
};
config.borderRightWidth = {
  properties: ['borderRightWidth'],
  scale: 'borderWidths',
};
config.borderRightColor = {
  properties: ['borderRightColor'],
  scale: 'colors',
};
config.borderRightStyle = {
  properties: ['borderRightStyle'],
  scale: 'borderStyles',
};

export const border = createSystem(config);
