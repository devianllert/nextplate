import * as React from 'react';

import { Box, Switch, useEffableTheme } from '@effable/react';

export const ChangeTheme = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { mode, setMode } = useEffableTheme('ChangeTheme');

  return (
    <Box display="flex" alignItems="center">
      <Switch checked={mode === 'dark'} size="small" onCheckedChange={(checked) => setMode(checked ? 'dark' : 'light')}>
        Dark Mode
      </Switch>
    </Box>
  );
};
