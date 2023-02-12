import { combine, createStore, Store } from 'effector';
import { ZodIssue } from 'zod';

export interface CreateErrorsOptions {
  errors: Store<ZodIssue[]>;
}

export const createErrors = (options: CreateErrorsOptions) => {
  const { errors } = options;

  const $isDirty = createStore(false);

  const $isValid = errors.map((errorsStore) => errorsStore.length === 0);
  const $hasErrors = errors.map((errorsStore) => errorsStore.length > 0);

  const $dirtyErrors = combine($isDirty, errors, (isDirty, errorsStore) => (isDirty ? errorsStore : []));

  const $isDirtyAndValid = $dirtyErrors.map((errorsStore) => errorsStore.length === 0);
  const $hasDirtyErrors = $dirtyErrors.map((errorsStore) => errorsStore.length > 0);

  return {
    $isDirty,
    $isValid,
    $hasErrors,
    $dirtyErrors,
    $isDirtyAndValid,
    $hasDirtyErrors,
  };
};
