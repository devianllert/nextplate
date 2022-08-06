import * as React from 'react';

import { responsiveProperty } from '../lib/responise-property';

export const defaultFontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif';

export const fontWeight = {
  light: 300,
  // Useful to set here if using anything other than `normal`
  normal: 400,
  medium: 500,
  // Useful to set here when bold webfonts come as 400 font-weight.
  bold: 700,
  heavy: 900,
  // instead of browser default, bold
  headings: 'bold',
};

export const pxToRem = (size: number, htmlFontSize = 16, coef = 0.625): number => (size / htmlFontSize) / coef;

function oneDecimal(x: number) {
  return Math.round(10 * x) / 10;
}

const caseAllCaps: React.CSSProperties = {
  textTransform: 'uppercase',
};

export const calculateFluidTypography = (minSize: number, maxSize: number): string => {
  const vwCoefficient = oneDecimal(((1000) * (maxSize - minSize)) / (1440 - 960));
  const remCoefficient = oneDecimal(minSize - (960 * (maxSize - minSize)) / (1440 - 960));

  const computedClamp = `clamp(${minSize}rem, ${vwCoefficient}vw ${remCoefficient >= 0 ? '+' : '-'} ${Math.abs(remCoefficient)}rem, ${maxSize}rem)`;

  return computedClamp;
};

interface ResponsiveVariantOptions {
  weight: number | string;
  size: number | string | (number | string | null)[];
  lineHeight: number | string | (number | string | null)[];
  letterSpacing: number | string;
  casing?: React.CSSProperties;
}

const buildResponsiveVariant = (options: ResponsiveVariantOptions): React.CSSProperties => {
  const {
    weight,
    size,
    letterSpacing,
    lineHeight,
    casing,
  } = options;

  const responsiveFontSize = responsiveProperty({
    property: 'fontSize',
    values: Array.isArray(size) ? size : [size],
  });

  return {
    fontFamily: defaultFontFamily,
    fontWeight: weight,
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    letterSpacing,
    ...casing,
    ...responsiveFontSize,
  };
};

export const headings = {
  h1: buildResponsiveVariant({
    weight: fontWeight.light,
    size: 96,
    lineHeight: 1.167,
    letterSpacing: -1.5,
  }),
  h2: buildResponsiveVariant({
    weight: fontWeight.light,
    size: 60,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  }),
  h3: buildResponsiveVariant({
    weight: fontWeight.normal,
    size: 48,
    lineHeight: 1.167,
    letterSpacing: 0,
  }),
  h4: buildResponsiveVariant({
    weight: fontWeight.normal,
    size: 34,
    lineHeight: 1.235,
    letterSpacing: 0.25,
  }),
  h5: buildResponsiveVariant({
    weight: fontWeight.normal,
    size: 24,
    lineHeight: 1.334,
    letterSpacing: 0,
  }),
  h6: buildResponsiveVariant({
    weight: fontWeight.medium,
    size: 20,
    lineHeight: 1.6,
    letterSpacing: 0.15,
  }),
  subtitle1: buildResponsiveVariant({
    weight: fontWeight.normal,
    size: 16,
    lineHeight: 1.75,
    letterSpacing: 0.15,
  }),
  subtitle2: buildResponsiveVariant({
    weight: fontWeight.medium,
    size: 14,
    lineHeight: 1.57,
    letterSpacing: 0.1,
  }),
};

export const paragraphs = {
  body1: buildResponsiveVariant({
    weight: fontWeight.normal,
    size: 20,
    lineHeight: 1.5,
    letterSpacing: 0.15,
  }),
  body2: buildResponsiveVariant({
    weight: fontWeight.normal,
    size: 16,
    lineHeight: 1.43,
    letterSpacing: 0.15,
  }),
  body3: buildResponsiveVariant({
    weight: fontWeight.normal,
    size: 14,
    lineHeight: 1.25,
    letterSpacing: 0.15,
  }),
};

export const overlines = {
  overline1: buildResponsiveVariant({
    weight: fontWeight.medium,
    size: 12,
    lineHeight: 2.66,
    letterSpacing: 1,
    casing: caseAllCaps,
  }),
  overline2: buildResponsiveVariant({
    weight: fontWeight.medium,
    size: 10,
    lineHeight: 2.66,
    letterSpacing: 1,
    casing: caseAllCaps,
  }),
};

export const captions = {
  caption1: buildResponsiveVariant({
    weight: fontWeight.normal,
    size: 12,
    lineHeight: 1.2,
    letterSpacing: 0.4,
  }),
  caption2: buildResponsiveVariant({
    weight: fontWeight.normal,
    size: 10,
    lineHeight: 1.2,
    letterSpacing: 0.4,
  }),
};

export const buttons = {
  button1: buildResponsiveVariant({
    weight: fontWeight.medium,
    size: 14,
    lineHeight: 1,
    letterSpacing: 0.4,
  }),
  button2: buildResponsiveVariant({
    weight: fontWeight.medium,
    size: 16,
    lineHeight: 1,
    letterSpacing: 0.4,
  }),
  button3: buildResponsiveVariant({
    weight: fontWeight.medium,
    size: 18,
    lineHeight: 1,
    letterSpacing: 0.4,
  }),
};

export const variants = {
  ...headings,
  ...paragraphs,
  ...buttons,
  ...captions,
  ...overlines,
};
