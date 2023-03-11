import { Effect, Event, Store } from 'effector';
import { ZodIssue } from 'zod';

export interface Field<T> {
  /**
   * Returns field's value.
   */
  $value: Store<T>;

  /**
   * Field validation errors.
   */
  $errors: Store<ZodIssue[]>;

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

  $isTouched: Store<boolean>;

  changed: Event<T>;
  blurred: Event<void>;
  reset: Event<T | undefined>;
  addError: Event<string | string[]>;
  validate: Event<void>;

  // [key: string]: Event<any> | Effect<any, any, any> | Store<any>;
}

export type FieldsObject = {
  [key: string]: Field<any>;
};
