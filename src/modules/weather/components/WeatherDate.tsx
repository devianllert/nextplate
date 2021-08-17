import * as React from 'react';
import format from 'date-fns/format';

import { Box } from '@/common/components/system/Box';
import { Typography } from '@/common/components/system/Typography';

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

  React.useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), DATE_UPDATE_TIMEOUT);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const formattedTime = formatTime(date);

  return (
    <Box>
      <Box
        display="flex"
        alignItems="flex-end"
      >
        <Typography variant="h4" component="span" mr={2} fontWeight="bold">{formattedTime.time}</Typography>
        <Typography variant="h6" component="span">{formattedTime.ampm}</Typography>
      </Box>

      <Typography variant="h6" component="span" fontWeight="normal">{formattedTime.date}</Typography>
    </Box>
  );
};
