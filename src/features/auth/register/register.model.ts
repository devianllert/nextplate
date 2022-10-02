import { createEvent, sample } from 'effector';
import { z } from 'zod';
import { registerFx } from '@/entities/auth';
import { createField, createForm } from '@/shared/lib/effector/forms';
import { email } from '../model';

export const registerButtonClicked = createEvent();

const username = createField({
  initialValue: '',
  schema: z.string().min(3),
});

const password = createField({
  initialValue: '',
  schema: z.string().min(1),
});

const confirmPassword = createField({
  initialValue: '',
  schema: z.string().min(1),
});

export const registerForm = createForm({
  fields: {
    email,
    username,
    password,
  },
  $disabled: registerFx.pending,
});

sample({
  clock: registerForm.submitted,
  target: registerFx,
});

sample({
  clock: registerFx.failData,
  filter: (error) => !!error.errors?.email,
  fn: (error) => error.errors?.email,
  target: registerForm.fields.email.addError,
});

sample({
  clock: registerFx.failData,
  filter: (error) => !!error.code,
  fn: (error) => error.code as string,
  target: registerForm.addError,
});

// loginForm.fields.email.$errors.watch(console.log);

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

registerForm.rejected.watch(console.log);
