import { FieldsObject } from './types';

export const extractValues = <T extends FieldsObject>(fields: T) => {
  // @ts-expect-error no default values
  const valuesObj: Record<keyof T, T[keyof T]['$value']> = {};

  Object.keys(fields).forEach((key: keyof T) => {
    valuesObj[key] = fields[key].$value;
  });

  return valuesObj;
};

export const extractErrors = <T extends FieldsObject>(fields: T) => {
  // @ts-expect-error no default values
  const valuesObj: Record<keyof T, T[keyof T]['$errors']> = {};

  Object.keys(fields).forEach((key: keyof T) => {
    valuesObj[key] = fields[key].$errors;
  });

  return valuesObj;
};
