import { createEvent, sample } from 'effector';
import { splitMap, spread } from 'patronum';
import { z } from 'zod';

import { loginFx } from '@/entities/auth';

import { createField, createForm } from '@/shared/lib/effector/forms';
import { pushFx } from '@/shared/lib/effector/router/effector-router';

import { email } from '../model';

export const loginButtonClicked = createEvent();

const password = createField({
  initialValue: '',
  schema: z.string().min(1, 'ERROR_FIELD_REQUIRED'),
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

const {
  fieldsError,
  commonError,
  __: unexpectedError,
} = splitMap({
  source: loginFx.failData,
  cases: {
    fieldsError: (error) => error.errors,
    commonError: (error) => error.code,
  },
});

spread({
  source: fieldsError,
  targets: {
    email: loginForm.fields.email.addError,
    password: loginForm.fields.password.addError,
  },
});

sample({
  clock: commonError,
  target: loginForm.addError,
});

sample({
  clock: unexpectedError,
  target: loginForm.addError.prepend(() => 'ERROR_UNEXPECTED'),
});

sample({
  clock: loginFx.done,
  fn: () => ({ url: '/dashboard' }),
  target: pushFx,
});
