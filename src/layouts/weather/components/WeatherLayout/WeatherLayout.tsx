import React from 'react';
import { ThemeProvider } from 'theme-ui';

import { makeTheme } from '@/common/design/themes';
import darkColors from '@/common/design/themes/dark/colors';

const weatherNestedTheme = makeTheme({
  colors: darkColors,
});

export interface WeatherLayoutProps {
  children?: React.ReactNode;
}

/**
 * We create layout for nested theme, cuz we want to use dark theme in all of weather pages
 */
export const WeatherLayout = (props: WeatherLayoutProps): JSX.Element => {
  const { children } = props;

  return (
    <ThemeProvider theme={weatherNestedTheme}>
      {children}
    </ThemeProvider>
  );
};
