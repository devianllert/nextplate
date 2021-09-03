import { useThemeUI } from 'theme-ui';

import { ColorOverrides } from '@/modules/core/theming/types/theme.interface';

import { theme } from '../themes';

export type ExactTheme = typeof theme & ColorOverrides;

interface ThemeCtxValue extends Omit<ReturnType<typeof useThemeUI>, 'theme'> {
  theme: ExactTheme;
}

export const useTheme = (useThemeUI as unknown) as () => ThemeCtxValue;
