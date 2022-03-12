import { parse as parseSafe } from 'flatted';

export const deserializeSafe = <T>(serializedValue: string): T => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return parseSafe(serializedValue);
};

export default deserializeSafe;
