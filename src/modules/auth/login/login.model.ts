import { createEvent, sample, split } from 'effector';
import { z, ZodIssue } from 'zod';
import { loginFx } from '@/entities/auth/auth.model';
import { createField, createForm } from '@/shared/lib/effector/forms';

export const loginButtonClicked = createEvent();

const email = createField({
  initialValue: '',
  schema: z.string().email(),
});

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

// const setEmailFieldError = createEvent<string>();

// sample({
//   clock: setEmailFieldError,
//   fn: (error) => [{ message: error.response.data.errors.email }] as ZodIssue[],
//   target: loginForm.fields.email.$errors,
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

loginForm.rejected.watch(console.log);
