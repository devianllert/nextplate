import {
  combine,
  Store,
  Event,
  Effect,
  createEvent,
  sample,
  createStore,
  EventPayload,
} from 'effector';
import { useUnit } from 'effector-react/scope';
import { condition } from 'patronum';
import { ZodIssue, ZodSchema } from 'zod';
import { createErrors } from './create-errors';

import { extractErrors, extractValues } from './extract-values';
import { Field } from './types';
import { validate } from './validate';

export type ConvertUnit<Shape extends Record<string, Event<any> | Effect<any, any, any> | Store<any>>> = {
  [Key in keyof Shape]: Shape[Key] extends Event<infer T>
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
  [K in keyof Record<keyof T, T[keyof T]['$value']>]: Record<keyof T, T[keyof T]['$value']>[K] extends Store<
  infer U
  >
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

  submitted: Event<ExtractValuesFromFields<T>>;

  rejected: Event<{ errors: ZodIssue[], values: ExtractValuesFromFields<T> }>;

  submit: Event<void>;

  reset: Event<void>;

  addError: Event<string>;
}

export const createForm = <T extends FieldsObject>(options: FormOptions<T>): Form<T> => {
  const {
    fields,
    schema,
    ...other
  } = options;

  const submit = createEvent();
  const submitted = createEvent<ExtractValuesFromFields<T>>();
  const rejected = createEvent<{ errors: ZodIssue[], values: ExtractValuesFromFields<T> }>();
  const reset = createEvent<void>();
  const addError = createEvent<string>();

  const $disabled = other.$disabled || createStore(false);
  const $validating = other.$validating || createStore(false);
  const fieldsArray = Object.entries(fields);
  const valuesObj = extractValues(fields);
  const $values = combine(valuesObj);
  const $formErrors = createStore<ZodIssue[]>([]);

  $formErrors.on(addError, (errors, newError) => [
    {
      message: newError,
      code: 'custom',
      path: [],
    },
    ...errors,
  ]);

  // const $errorsObj = extractErrors(fields);
  const $errors = combine(combine(fieldsArray.map(([_, field]) => field.$errors)), $formErrors, (fieldErrors, ownErrors) => {
    const allErrors = [...fieldErrors.flat(), ...ownErrors];
    return allErrors.length ? allErrors : [];
  });

  const $submitCount = createStore(0);
  $submitCount.on(submit, (state) => state + 1).reset(reset);

  const meta = createErrors({ errors: $errors });

  meta.$isDirty.on(combine(fieldsArray.map(([_, field]) => field.$isDirty)), (_prev, dirties) => dirties.some(Boolean));

  if (schema) {
    $formErrors.on($values, (_prev, values) => {
      return validate(values, schema);
    });
  }

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

  // fieldsArray.forEach((field) => {
  //   sample({
  //     clock: rejected,
  //     filter: (data) => data.errors.
  //   })
  // })

  return {
    fields,
    $values,
    $errors,
    $formErrors,
    submitted,
    rejected,
    submit,
    reset,
    addError,
    ...meta,
  };
};

export const useForm = <T extends FieldsObject>(form: Form<T>) => {
  // const fieldsStores = Object.entries(form.fields).reduce((acc, field) => {
  //   const fieldKey = field[0];
  //   const fieldValue = field[1];

  //   const { stores, events } = Object.entries(fieldValue).reduce(
  //     (storesAcc, [unitKey, unit]) => {
  //       if (is.store(unit)) {
  //         // eslint-disable-next-line no-param-reassign
  //         storesAcc.stores[unitKey] = unit;
  //       }

  //       if (is.event(unit)) {
  //         // eslint-disable-next-line no-param-reassign
  //         storesAcc.events[unitKey] = unit;
  //       }

  //       return storesAcc;
  //     },
  //     { stores: {}, events: {} } as { stores: Record<string, Store<any>>; events: Record<string, Event<any>> },
  //   );

  //   acc[fieldKey] = {
  //     stores: combine(stores),
  //     events,
  //   };

  //   return acc;
  // }, {});

  // const stores = useUnit({
  //   values: form.$values,
  //   // ...form.fields,
  // });

  // const events = useUnit({
  //   // ...form.fields,
  // });

  // console.log(fieldsStores);

  const { fields: formFields, $values, ...$meta } = form;

  // @ts-expect-error qwe
  const fields: Record<keyof T, ConvertUnit<T[keyof T]>> = {};
  const fieldKeys = Object.keys(formFields);

  for (let i = 0; i < fieldKeys.length; i += 1) {
    const key = fieldKeys[i] as keyof T;

    // @ts-expect-error qwe
    // eslint-disable-next-line react-hooks/rules-of-hooks
    fields[key] = useUnit({
      ...formFields[key],
    });
  }

  // .forEach((fieldKey) => {
  //   fields[fieldKey] = useUnit();
  // });

  const values = useUnit($values);
  const meta = useUnit({ ...$meta });

  return {
    fields,
    values,
    ...meta,
  };
};
