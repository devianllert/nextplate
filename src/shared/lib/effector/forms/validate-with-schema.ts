import { ZodSchema } from 'zod';

export const validateWithSchema = <T>(value: T, schema: ZodSchema<T>) => {
  const result = schema.safeParse(value);

  if (result.success) {
    return [];
  }

  return result.error.errors;
};
