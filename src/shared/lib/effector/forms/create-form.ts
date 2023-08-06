/* eslint-disable react-hooks/rules-of-hooks */
import { combine, createEvent, createStore, Effect, Event, EventPayload, sample, Store } from 'effector';
import { useUnit } from 'effector-react';
import { condition } from 'patronum';
import { ZodIssue, ZodSchema } from 'zod';

import { createErrors } from './create-errors';
import { extractValues } from './extract-values';
import { Field } from './types';
import { validateWithSchema } from './validate-with-schema';

type ExcludeSymbol<T> = T extends `$${infer Prefix}` ? Prefix : T;

export type ConvertUnit<Shape extends Field<any>> = {
  [Key in keyof Shape as ExcludeSymbol<Key>]: Shape[Key] extends Event<infer T>
    ? (payload: T) => T
    : Shape[Key] extends Effect<infer P, infer D, any>
    ? (payload: P) => Promise<D>
    : Shape[Key] extends Store<infer V>
    ? V
    : never;
};

export type FieldsObject = {
  [key: string]: Field<any>;
};

export type ExtractValuesFromFields<T extends FieldsObject> = {
  [K in keyof Record<keyof T, T[keyof T]['$value']>]: Record<keyof T, T[keyof T]['$value']>[K] extends Store<infer U>
    ? U
    : Record<keyof T, T[keyof T]['$value']>[K];
};

export interface FormOptions<T extends FieldsObject> {
  fields: T;
  schema?: ZodSchema<ExtractValuesFromFields<T>>;
  $disabled?: Store<boolean>;
  $validating?: Store<boolean>;
}

export interface Form<T extends FieldsObject> {
  fields: T;
  $values: Store<ExtractValuesFromFields<T>>;
  /**
   * Field validation errors.
   */
  $errors: Store<ZodIssue[]>;

  /**
   * Field validation errors.
   */
  $formErrors: Store<ZodIssue[]>;

  /**
   * Returns `true` if there are no errors and `false` otherwise.
   */
  $isValid: Store<boolean>;

  /**
   * Returns true if values are not deeply equal from initial values, false otherwise.
   * `$isDirty` is a readonly computed property and should not be mutated directly.
   */
  $isDirty: Store<boolean>;

  /**
   * Returns `true` if field has errors and `false` otherwise.
   */
  $hasErrors: Store<boolean>;

  $dirtyErrors: Store<ZodIssue[]>;

  $isDirtyAndValid: Store<boolean>;

  $hasDirtyErrors: Store<boolean>;

  $submitCount: Store<number>;

  submitted: Event<ExtractValuesFromFields<T>>;

  rejected: Event<{ errors: ZodIssue[]; values: ExtractValuesFromFields<T> }>;

  submit: Event<void>;

  reset: Event<void>;

  addError: Event<string | string[]>;
}

export const createForm = <T extends FieldsObject>(options: FormOptions<T>): Form<T> => {
  const { fields, schema, ...other } = options;

  const submit = createEvent();
  const submitted = createEvent<ExtractValuesFromFields<T>>();
  const rejected = createEvent<{ errors: ZodIssue[]; values: ExtractValuesFromFields<T> }>();
  const reset = createEvent<void>();
  const addError = createEvent<string | string[]>();

  const $disabled = other.$disabled || createStore(false);
  const $validating = other.$validating || createStore(false);
  const fieldsArray = Object.entries(fields);
  const valuesObj = extractValues(fields);
  const $values = combine(valuesObj);
  const $formErrors = createStore<ZodIssue[]>([]);

  $formErrors
    .on(addError, (errors, newError) => [
      ...(Array.isArray(newError)
        ? newError.map((message) => ({ message, code: 'custom', path: [] } as ZodIssue))
        : ([{ message: newError, code: 'custom', path: [] }] as ZodIssue[])),
      ...errors,
    ])
    .reset($values);

  // const $errorsObj = extractErrors(fields);
  const $errors = combine(
    combine(fieldsArray.map(([_, field]) => field.$errors)),
    $formErrors,
    (fieldErrors, ownErrors) => {
      const allErrors = [...fieldErrors.flat(), ...ownErrors];
      return allErrors.length ? allErrors : [];
    },
  );

  const $submitCount = createStore(0);
  $submitCount.on(submit, (state) => state + 1).reset(reset);

  const meta = createErrors({ errors: $errors });

  meta.$isDirty.on(combine(fieldsArray.map(([_, field]) => field.$isDirty)), (_prev, dirties) => dirties.some(Boolean));

  if (schema) {
    $formErrors.on($values, (_prev, values) => {
      return validateWithSchema(values, schema);
    });
  }

  fieldsArray.forEach(([_, field]) => {
    sample({
      clock: submit,
      target: field.validate,
    });
  });

  fieldsArray.forEach(([_, field]) => {
    sample({
      clock: reset,
      target: field.reset,
    });
  });

  const submitWithFormState = sample({
    clock: submit,
    source: {
      errors: $errors,
      isValid: meta.$isValid,
      values: $values,
      disabled: $disabled,
      validating: $validating,
    },
    filter: ({ disabled, validating }) => !disabled && !validating,
  });

  condition({
    source: submitWithFormState,
    if: ({ isValid }) => isValid,
    then: submitted.prepend((data: EventPayload<typeof submitWithFormState>) => data.values),
    else: rejected.prepend((data: EventPayload<typeof submitWithFormState>) => ({
      errors: data.errors,
      values: data.values,
    })),
  });

  return {
    fields,
    $values,
    $errors,
    $formErrors,
    $submitCount,
    submitted,
    rejected,
    submit,
    reset,
    addError,
    ...meta,
  };
};

export const useForm = <T extends FieldsObject>(form: Form<T>) => {
  const { fields: formFields, $values: $formValues, ...$meta } = form;

  // @ts-ignore
  const fields: Record<keyof T, ConvertUnit<T[keyof T]>> = {};
  const fieldKeys = Object.keys(formFields);

  for (let i = 0; i < fieldKeys.length; i += 1) {
    const key = fieldKeys[i] as keyof T;

    // @ts-ignore
    fields[key] = useUnit({
      value: formFields[key].$value,
      errors: formFields[key].$errors,
      isValid: formFields[key].$isValid,
      isDirty: formFields[key].$isDirty,
      hasErrors: formFields[key].$hasErrors,
      dirtyErrors: formFields[key].$dirtyErrors,
      isDirtyAndValid: formFields[key].$isDirtyAndValid,
      hasDirtyErrors: formFields[key].$hasDirtyErrors,
      isTouched: formFields[key].$isTouched,
      changed: formFields[key].changed,
      blurred: formFields[key].blurred,
      reset: formFields[key].reset,
      addError: formFields[key].addError,
    });
  }

  const values = useUnit($formValues);

  const meta = useUnit({
    errors: $meta.$errors,
    dirtyErrors: $meta.$dirtyErrors,
    formErrors: $meta.$formErrors,
    hasDirtyErrors: $meta.$hasDirtyErrors,
    hasErrors: $meta.$hasErrors,
    isDirty: $meta.$isDirty,
    isDirtyAndValid: $meta.$isDirtyAndValid,
    isValid: $meta.$isValid,
    submitCount: $meta.$submitCount,
    addError: $meta.addError,
    submit: $meta.submit,
    reset: $meta.reset,
    submitted: $meta.submitted,
    rejected: $meta.rejected,
  });

  return {
    fields,
    values,
    ...meta,
  };
};
