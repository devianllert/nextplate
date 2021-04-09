import { formatDistance } from 'date-fns';

export const relativeTimeFormat = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return formatDistance(dateObj, new Date(), { addSuffix: true });
};
