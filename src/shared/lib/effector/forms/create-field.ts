import { createEvent, createStore, sample } from 'effector';
import { ZodSchema } from 'zod';
import { createErrors } from './create-errors';

import { Field } from './types';
import { validate } from './validate';

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
  const addError = createEvent<string>();

  const $value = createStore(initialValue);
  $value
    .on(reset, (_, resetValue) => (resetValue === undefined ? initialValue : resetValue))
    .on(changed, (_, newValue) => newValue);

  const $errors = createStore(schema ? validate(initialValue, schema) : []);
  $errors.on(addError, (errors, newError) => [
    {
      message: newError,
      code: 'custom',
      path: [],
    },
    ...errors,
  ]);

  const meta = createErrors({ errors: $errors });

  meta.$isDirty.on($value, (_, newValue) => newValue !== initialValue).on(reset, () => false);
  meta.$isDirty.on(restore, () => false);

  const $isTouched = createStore(false);
  $isTouched
    .on($value, () => true)
    .on(blurred, () => true)
    .on(restore, () => false)
    .on(addError, () => true);

  if (schema) {
    $errors.on($value, (_prev, value) => {
      return validate(value, schema);
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
  };
};
