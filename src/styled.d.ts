import '@emotion/react';

import { EffableTheme } from '@effable/react';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends EffableTheme {}
}
