import tinycolor2 from 'tinycolor2';

import dark from '@/common/design/themes/dark/colors';
import light from '@/common/design/themes/light/colors';

const CONTRAST_THRESHOLD = 3;

/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} A contrast ratio value in the range 0 - 21.
 */
export function getContrast(foreground: string, background: string): number {
  const lumA = tinycolor2(foreground).getLuminance();
  const lumB = tinycolor2(background).getLuminance();
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}

// Use the same logic as
// Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
// and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54
export function getContrastText(background: string): string {
  const contrastText = getContrast(background, dark.text.primary) >= CONTRAST_THRESHOLD
    ? dark.text.primary
    : light.text.primary;

  return contrastText;
}
