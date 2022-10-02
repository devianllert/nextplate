import { createEvent, sample } from 'effector';
import { z } from 'zod';

import { loginFx } from '@/entities/auth';
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
