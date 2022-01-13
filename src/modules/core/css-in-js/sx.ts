import { CSSObject } from '@emotion/styled';
import css, { SystemCssProperties, SystemStyleObject } from '@styled-system/css';
import { Theme } from 'theme-ui';
import { ColorProps } from 'styled-system';

import lightColors from '@/common/design/themes/light/colors';
import { Flatten } from '@/common/utils/flattenObject';

type ThemeColorPaths = keyof Flatten<typeof lightColors>;

export type BetterCssProperties = {
  [K in keyof SystemCssProperties]: K extends keyof ColorProps
    ? ThemeColorPaths | SystemCssProperties[K]
    : SystemCssProperties[K]
};

export type BetterSystemStyleObject = BetterCssProperties | SystemStyleObject;

export interface SxProp {
  /**
   * Our components are designed to cover common usage patterns,
   * but sometimes a component just isn't quite flexible enough to look the way you need it to look.
   * For those cases, we provide the `sx` prop.
   *
   * The `sx` prop allows ad-hoc styling that is still theme-aware.
   *
   * Use the `sx` prop for small stylistic changes to components. For more substantial changes, consider abstracting your style changes into your own wrapper component.
   * Avoid nesting and pseudo-selectors in `sx` prop values when possible.
   */
  sx?: BetterSystemStyleObject
}

export const sx = (props: SxProp) => css(props.sx) as ((props: { theme?: Theme }) => CSSObject);
