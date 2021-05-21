import { createGlobalStyle } from 'styled-components';
import { createTransition, duration } from './tokens/transitions';

import { defaultFontFamily } from './tokens/typography';

const GlobalStyles = createGlobalStyle`
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

    color: ${({ theme }) => theme.palette.text.primary};

    background-color: ${({ theme }) => theme.palette.background.primary};

    transition: ${createTransition(['color', 'background-color'], { duration: duration.short })};

    letter-spacing: normal;
  }

  /* Make sure images have an alt attribute */
  img:not([alt]) {
    border: 5px dashed red;
  }
`;

export default GlobalStyles;
