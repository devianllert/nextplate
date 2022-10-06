import * as React from 'react';
import format from 'date-fns/format';

import { Box } from '@/shared/components/system/box';
import * as Text from '@/shared/components/system/text';
import { useInterval } from '@/shared/hooks/use-interval';
import { DisplayOnBrowserMount } from '@/shared/components/rehydration/display-on-browser-mount';

const DATE_UPDATE_TIMEOUT = 30 * 1000;

const formatTime = (date: Date) => {
  return {
    time: format(date, 'hh:mm'),
    ampm: format(date, 'aa'),
    date: format(date, 'EEEE, d LLLL yyyy'),
  };
};

export const WeatherDate = (): JSX.Element => {
  const [date, setDate] = React.useState(new Date());

  useInterval(() => setDate(new Date()), DATE_UPDATE_TIMEOUT);

  const formattedTime = formatTime(date);

  return (
    <DisplayOnBrowserMount>
      <Box>
        <Box
          display="flex"
          alignItems="flex-end"
        >
          <Text.Heading variant="h4" component="span" fontWeight="bold" sx={{ mr: 2 }}>{formattedTime.time}</Text.Heading>
          <Text.Heading variant="h6" component="span">{formattedTime.ampm}</Text.Heading>
        </Box>

        <Text.Heading variant="h6" component="span" fontWeight="normal">{formattedTime.date}</Text.Heading>
      </Box>
    </DisplayOnBrowserMount>
  );
};
