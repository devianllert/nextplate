import * as React from 'react';

export type ThemeUIContextValue = {
  mode?: string;
  toggle?: (colorMode: React.SetStateAction<string | undefined>) => void;
};

/**
 * Initial context, used by default until the Context Provider is initialised.
 *
 * @default Empty object, to allow for destructuring even when the context hasn't been initialised (on the server)
 */
const initialContext = {};

/**
 * Uses native React Context API
 *
 * @see https://reactjs.org/docs/context.html
 * @see https://medium.com/better-programming/react-hooks-usecontext-30eb560999f for useContext hook example (open in anonymous browser #paywall)
 */
export const themeContext = React.createContext<ThemeUIContextValue>(initialContext);

export default themeContext;
