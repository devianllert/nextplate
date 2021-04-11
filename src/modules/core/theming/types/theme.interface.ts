import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    /**
     * The colors used to style the text.
     */
    text: {
      primary: string;
      secondary: string;
    };
    /**
     * The background colors used to style the surfaces.
     * Consistency between these values is important.
     */
    background: {
      primary: string;
      secondary: string;
    };
    /**
     * The colors used to style the text/background.
     */
    status: {
      success: string;
      info: string;
      warning: string;
      error: string;
    };
    /**
     * The colors used to style the text.
     */
    greyscale: {
      dark: string;
      medium: string;
      light: string;
      lighter: string;
    };
    /**
     * The brand colors used to style the text/background.
     */
    brand: {
      primary: string;
      secondary: string;
      tea: string;
    };

    /**
     * The action colors used to style the text/background.
     */
    action: {
      /**
       * The color of an active action like an icon button.
       */
      active: string,
      /*
       * The color of an hovered action.
       */
      hover: string,
      hoverOpacity: number,
      /*
       * The color of a selected action.
       */
      selected: string,
      selectedOpacity: number,
      /*
       * The color of a disabled action.
       */
      disabled: string,
      /*
       * The background color of a disabled action.
       */
      disabledBackground: string,
      disabledOpacity: number,
      /*
       * The background color of a focused action.
       */
      focus: string,
      focusOpacity: number,
      /*
       * The background color of a activated action.
       */
      activatedOpacity: number,
    };
    /**
     * The color used to divide different elements.
     */
    divider: {
      primary: string;
    };
  }
}
