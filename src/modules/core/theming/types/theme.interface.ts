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
     * The colors used to style the background.
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
      focus: string,
      focusOpacity: number,
      activatedOpacity: number,
    };

    /**
     * The divider colors used to style the text.
     */
    divider: {
      primary: string;
    };
  }
}
