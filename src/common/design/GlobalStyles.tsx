import { Global, css } from '@emotion/react';

import { useTheme } from './hooks/useTheme';
import { createTransition, duration } from './tokens/transitions';
import { defaultFontFamily } from './tokens/typography';

export const GlobalStyles = (): JSX.Element => {
  const { theme } = useTheme();

  return (
    <Global
      styles={css`
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

          color: ${theme.colors.text.primary};

          background-color: ${theme.colors.background.primary};

          /* transition: ${createTransition(['color', 'background-color'], { duration: duration.short })}; */

          letter-spacing: normal;
        }

        ::selection {
          background-color: ${theme.colors.radix.primaryA5};
          color: ${theme.colors.radix.primary12};
        }

        a {
          color: ${theme.colors.radix.primary11};
        }

        *:focus {
          outline: 2px solid ${theme.colors.radix.gray8};
        }

        /* Make sure images have an alt attribute */
        img:not([alt]) {
          border: 5px dashed red;
        }
      `}
    />
  );
};
