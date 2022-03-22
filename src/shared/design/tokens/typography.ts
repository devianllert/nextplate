import { CSSProperties } from 'react';

export const defaultFontFamily = 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif';

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

function oneDecimal(x) {
  return Math.round(10 * x) / 10;
}

const caseAllCaps: CSSProperties = {
  textTransform: 'uppercase',
};

export const calculateFluidTypography = (minSize: number, maxSize: number): string => {
  const vwCoefficient = oneDecimal(((1000) * (maxSize - minSize)) / (1440 - 960));
  const remCoefficient = oneDecimal(minSize - (960 * (maxSize - minSize)) / (1440 - 960));

  const computedClamp = `clamp(${minSize}rem, ${vwCoefficient}vw ${remCoefficient >= 0 ? '+' : '-'} ${Math.abs(remCoefficient)}rem, ${maxSize}rem)`;

  return computedClamp;
};

const buildVariant = (weight: number, size: number, lineHeight: number, letterSpacing: number, casing?: CSSProperties): CSSProperties => ({
  fontFamily: defaultFontFamily,
  fontWeight: weight,
  fontSize: `${pxToRem(size)}rem`,
  // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
  lineHeight,
  // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
  // across font-families can cause issues with the kerning.
  letterSpacing,
  ...casing,
});

export const headings = {
  h1: buildVariant(fontWeight.light, 96, 1.167, -1.5),
  h2: buildVariant(fontWeight.light, 60, 1.2, -0.5),
  h3: buildVariant(fontWeight.normal, 48, 1.167, 0),
  h4: buildVariant(fontWeight.normal, 34, 1.235, 0.25),
  h5: buildVariant(fontWeight.normal, 24, 1.334, 0),
  h6: buildVariant(fontWeight.medium, 20, 1.6, 0.15),
  subtitle1: buildVariant(fontWeight.normal, 16, 1.75, 0.15),
  subtitle2: buildVariant(fontWeight.medium, 14, 1.57, 0.1),
};

export const paragraphs = {
  body1: buildVariant(fontWeight.normal, 20, 1.5, 0.15),
  body2: buildVariant(fontWeight.normal, 16, 1.43, 0.15),
  body3: buildVariant(fontWeight.normal, 14, 1.25, 0.15),
};

export const overlines = {
  overline1: buildVariant(fontWeight.medium, 12, 2.66, 1, caseAllCaps),
  overline2: buildVariant(fontWeight.medium, 10, 2.66, 1, caseAllCaps),
};

export const captions = {
  caption1: buildVariant(fontWeight.normal, 12, 1.2, 0.4),
  caption2: buildVariant(fontWeight.normal, 10, 1.2, 0.4),
};

export const variants = {
  ...headings,
  subtitle1: buildVariant(fontWeight.normal, 16, 1.75, 0.15),
  subtitle2: buildVariant(fontWeight.medium, 14, 1.57, 0.1),
  ...paragraphs,
  button: buildVariant(fontWeight.medium, 14, 1.75, 0.4, caseAllCaps),
  ...captions,
  ...overlines,
};
