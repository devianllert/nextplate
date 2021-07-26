import { Global, css } from '@emotion/react';

import { useTheme } from './hooks/useTheme';
import { createScrollbarStyles } from './tokens/scrollbar';
import { createTransition, duration } from './tokens/transitions';
import { defaultFontFamily } from './tokens/typography';

export const GlobalStyles = (): JSX.Element => {
  const { theme } = useTheme();

  return (
    <Global
      styles={css`
        ${createScrollbarStyles({ thumbColor: theme.colors.brand.primary, trackColor: 'transparent' })}

        html {
          font-size: 62.5%;
        }

        body {
          overflow-y: scroll;

          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;

          text-rendering: optimizeLegibility;

          font-display: swap;
          font-family: ${defaultFontFamily};
          font-size: 1.6em;
          font-weight: 400;

          color: ${theme.colors.text};

          background-color: ${theme.colors.background};

          transition: ${createTransition(['color', 'background-color'], { duration: duration.short })};

          letter-spacing: normal;
        }

        /* Make sure images have an alt attribute */
        img:not([alt]) {
          border: 5px dashed red;
        }
      `}
    />
  );
};
