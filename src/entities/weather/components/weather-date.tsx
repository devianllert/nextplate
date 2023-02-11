import * as React from 'react';
import format from 'date-fns/format';
import {
  Box, DisplayOnBrowserMount, Heading, useInterval,
} from '@effable/react';

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
          <Heading variant="h4" component="span" fontWeight="bold" sx={{ mr: 2 }}>{formattedTime.time}</Heading>
          <Heading variant="h6" component="span">{formattedTime.ampm}</Heading>
        </Box>

        <Heading variant="h6" component="span" fontWeight="normal">{formattedTime.date}</Heading>
      </Box>
    </DisplayOnBrowserMount>
  );
};
