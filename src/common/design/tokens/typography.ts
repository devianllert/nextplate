import { CSSProperties } from 'react';

export const defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';

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

export const pxToRem = (size: number, htmlFontSize = 16, coef = 0.625): string => `${(size / htmlFontSize) / coef}rem`;

const caseAllCaps: CSSProperties = {
  textTransform: 'uppercase',
};

const buildVariant = (weight: number, size: number, lineHeight: number, letterSpacing: number, casing?: CSSProperties): CSSProperties => ({
  fontFamily: defaultFontFamily,
  fontWeight: weight,
  fontSize: pxToRem(size),
  // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
  lineHeight,
  // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
  // across font-families can cause issues with the kerning.
  letterSpacing,
  ...casing,
});

export const variants = {
  h1: buildVariant(fontWeight.light, 96, 1.167, -1.5),
  h2: buildVariant(fontWeight.light, 60, 1.2, -0.5),
  h3: buildVariant(fontWeight.normal, 48, 1.167, 0),
  h4: buildVariant(fontWeight.normal, 34, 1.235, 0.25),
  h5: buildVariant(fontWeight.normal, 24, 1.334, 0),
  h6: buildVariant(fontWeight.medium, 20, 1.6, 0.15),
  subtitle1: buildVariant(fontWeight.normal, 16, 1.75, 0.15),
  subtitle2: buildVariant(fontWeight.medium, 14, 1.57, 0.1),
  body1: buildVariant(fontWeight.normal, 16, 1.5, 0.15),
  body2: buildVariant(fontWeight.normal, 14, 1.43, 0.15),
  button: buildVariant(fontWeight.medium, 14, 1.75, 0.4, caseAllCaps),
  caption: buildVariant(fontWeight.normal, 12, 1.66, 0.4),
  overline: buildVariant(fontWeight.normal, 12, 2.66, 1, caseAllCaps),
};