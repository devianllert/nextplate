import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    cursor: default;

    overflow-y: scroll;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    text-rendering: optimizeLegibility;

    font-display: swap;
    font-family: 'Roboto', sans-serif;
    font-size: 1.6em;
    font-weight: 400;

    letter-spacing: normal;
  }

  /* Make sure images have an alt attribute */
  img:not([alt]) {
    border: 5px dashed red;
  }
`;

export default GlobalStyles;
