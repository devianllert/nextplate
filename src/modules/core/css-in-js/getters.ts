import { Scale } from 'styled-system';

import { get } from '@/common/utils/get';

const isNumber = (n: unknown): n is number => typeof n === 'number' && !Number.isNaN(n);

export const getSpace = (scale: Scale, n: number | string): number | string => {
  if (!isNumber(n)) {
    return (get(scale, n) as number) ?? n;
  }

  const isNegative = n < 0;
  const absolute = Math.abs(n);
  const value = (get(scale, absolute) ?? absolute) as number;

  if (!isNumber(value)) {
    return isNegative ? `-${value as string}` : value;
  }

  return value;
};
