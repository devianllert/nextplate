import { CSSObject } from '@emotion/styled';
import css, { SystemCssProperties, SystemStyleObject } from '@styled-system/css';
import { Theme } from 'theme-ui';
import { ColorProps } from 'styled-system';
import { KeyPaths } from '@/common/utils/types/KeyPaths';
import lightColors from '@/common/design/themes/light/colors';

type ThemeColorPaths = KeyPaths<typeof lightColors>;

export type BetterCssProperties = {
  [K in keyof SystemCssProperties]: K extends keyof ColorProps
    ? ThemeColorPaths | SystemCssProperties[K]
    : SystemCssProperties[K]
};

export type BetterSystemStyleObject = BetterCssProperties | SystemStyleObject;

export interface SxProp {
  sx?: BetterSystemStyleObject
}

export const sx = (props: SxProp) => css(props.sx) as ((props: { theme?: Theme }) => CSSObject);
