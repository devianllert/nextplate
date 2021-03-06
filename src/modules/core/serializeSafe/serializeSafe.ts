import { stringify as stringifySafe } from 'flatted';
import { Flatted } from './types/Flatted';

export const serializeSafe = <T>(value: Record<string, unknown> | any[]): Flatted<T> => {
  return stringifySafe(value);
};

export default serializeSafe;
