import * as React from 'react';

import { Box, Switch, Text } from '@effable/react';

export const ChangeTheme = (): JSX.Element => {
  return (
    <Box display="flex" alignItems="center">
      <Switch size="small" />

      <Text variant="m" color="text.primary" sx={{ marginLeft: '10px' }}>
        Dark Mode
      </Text>
    </Box>
  );
};
