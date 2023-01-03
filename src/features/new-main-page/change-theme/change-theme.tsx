import * as React from 'react';

import { Box, Text } from '@effable/react';
import { Switch } from '@/shared/components/system/switch';

export const SettingsButton = (): JSX.Element => {
  return (
    <Box
      display="flex"
      alignItems="center"
    >
      <Switch size="small" />

      <Text fontSize="16px" sx={{ marginLeft: '10px' }}>
        Dark Mode
      </Text>
    </Box>
  );
};
