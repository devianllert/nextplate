import { createEvent, sample, split } from 'effector';
import { z } from 'zod';
import { loginFx } from '@/entities/auth/auth.model';
import { createField, createForm } from '@/shared/lib/effector/forms';
import { pushFx } from '@/shared/lib/effector/router/effector-router';
import { email } from '../model';

export const loginButtonClicked = createEvent();

const password = createField({
  initialValue: '',
  schema: z.string().min(1),
});

export const loginForm = createForm({
  fields: {
    email,
    password,
  },
  $disabled: loginFx.pending,
});

sample({
  clock: loginForm.submitted,
  target: loginFx,
});

sample({
  clock: loginFx.failData,
  filter: (error) => !!error.errors?.email,
  fn: (error) => error.errors?.email,
  target: loginForm.fields.email.addError,
});

sample({
  clock: loginFx.failData,
  filter: (error) => !!error.code,
  fn: (error) => error.code as string,
  target: loginForm.addError,
});

sample({
  clock: loginFx.done,
  fn: () => ({ url: '/dashboard' }),
  target: pushFx,
});

loginForm.$formErrors.watch(console.log);

// sample({
//   clock: loginFx.failData,
//   fn: (error) => [{ message: (error as AxiosError).response?.data.errors.email }] as ZodIssue[],
//   target: loginForm.fields.email.addError,
// });

// loginForm.fields.email.$errors.watch(console.log);

// split({
//   source: loginFx.failData,
//   match: {
//     email: (data) => data.response.data.errors.email,
//   },
//   cases: {
//     email: setEmailFieldError,
//   },
// });

// sample({
//   clock: loginForm.rejected,
//   target: loginForm
// })
