import { createEvent, sample } from 'effector';
import { splitMap, spread } from 'patronum';
import { z } from 'zod';

import { registerFx } from '@/entities/auth';

import { createField, createForm } from '@/shared/lib/effector/forms';

import { email } from '../model';

export const registerButtonClicked = createEvent();

const username = createField({
  initialValue: '',
  schema: z.string().min(3, 'ERROR_USERNAME_MIN'),
});

const password = createField({
  initialValue: '',
  schema: z.string().min(6, 'ERROR_PASSWORD_MIN'),
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

const {
  fieldsError,
  commonError,
  __: unexpectedError,
} = splitMap({
  source: registerFx.failData,
  cases: {
    fieldsError: (error) => error.errors,
    commonError: (error) => error.code,
  },
});

spread({
  source: fieldsError,
  targets: {
    email: registerForm.fields.email.addError,
    username: registerForm.fields.username.addError,
    password: registerForm.fields.password.addError,
  },
});

sample({
  clock: commonError,
  target: registerForm.addError,
});

sample({
  clock: unexpectedError,
  target: registerForm.addError.prepend(() => 'ERROR_UNEXPECTED'),
});
