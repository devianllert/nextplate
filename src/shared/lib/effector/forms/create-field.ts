import { createEvent, createStore, sample } from 'effector';
import { ZodIssue, ZodSchema } from 'zod';

import { createErrors } from './create-errors';
import { Field } from './types';
import { validateWithSchema } from './validate-with-schema';

export interface FieldOptions<T> {
  initialValue: T;
  schema?: ZodSchema<T>;
}

export const createField = <T>(options: FieldOptions<T>): Field<T> => {
  const { initialValue, schema } = options;

  const reset = createEvent<T | undefined>();
  const restore = sample({ clock: reset });

  const changed = createEvent<T>();
  const blurred = createEvent<void>();
  const addError = createEvent<string | string[]>();
  const validate = createEvent<void>();

  const $value = createStore(initialValue);
  $value
    .on(reset, (_, resetValue) => (resetValue === undefined ? initialValue : resetValue))
    .on(changed, (_, newValue) => newValue);

  const $errors = createStore(schema ? validateWithSchema(initialValue, schema) : []);
  $errors.on(addError, (errors, newError) => [
    ...(Array.isArray(newError)
      ? newError.map((message) => ({ message, code: 'custom', path: [] } as ZodIssue))
      : ([{ message: newError, code: 'custom', path: [] }] as ZodIssue[])),
    ...errors,
  ]);

  const meta = createErrors({ errors: $errors });

  meta.$isDirty.on($value, (_, newValue) => newValue !== initialValue).on(reset, () => false);
  meta.$isDirty.on(restore, () => false);

  const $isTouched = createStore(false);
  $isTouched
    .on($value, () => true)
    .on(blurred, () => true)
    .on(addError, () => true)
    .on(validate, () => true)
    .on(restore, () => false);

  if (schema) {
    $errors.on($value, (_prev, value) => {
      return validateWithSchema(value, schema);
    });

    sample({
      clock: validate,
      source: $value,
      fn: (value) => validateWithSchema(value, schema),
      target: $errors,
    });
  }

  return {
    $value,
    $errors,
    $isValid: meta.$isValid,
    $hasErrors: meta.$hasErrors,
    $isDirty: meta.$isDirty,
    $dirtyErrors: meta.$dirtyErrors,
    $hasDirtyErrors: meta.$hasDirtyErrors,
    $isDirtyAndValid: meta.$isDirtyAndValid,
    $isTouched,
    blurred,
    changed,
    addError,
    reset,
    validate,
  };
};
