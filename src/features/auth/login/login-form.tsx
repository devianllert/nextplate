import * as React from 'react';
import NextLink from 'next/link';
import { Box, Button, Divider, Field, Heading, Input, Link, Stack, Text } from '@effable/react';
import { useUnit } from 'effector-react';
import { useTranslation } from 'next-i18next';

import { loginFx } from '@/entities/auth';

import { GithubButton } from '@/shared/components/github-button';
import { GoogleButton } from '@/shared/components/google-button';
import { InputPassword } from '@/shared/components/system/input/input-password';
import { useForm } from '@/shared/lib/effector/forms';

import { loginForm } from './login.model';

export const LoginForm = () => {
  const { t } = useTranslation(['auth', 'common']);
  const isSubmitting = useUnit(loginFx.pending);

  const form = useForm(loginForm);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    form.submit();
  };

  return (
    <Box component="form" maxWidth="440px" width="100%" onSubmit={onSubmit}>
      <Heading variant="h1" component="h1" sx={{ mb: '4x' }}>
        {t('LOGIN')}
      </Heading>

      <Stack direction="column">
        <GoogleButton />
        <GithubButton />
      </Stack>

      <Divider mt="4x" mb="4x" label="OR" />

      <Stack direction="column">
        <Field
          label={t('EMAIL_LABEL')}
          isInvalid={(form.fields.email.isTouched && form.fields.email.hasErrors) || !!form.formErrors.length}
          description={form.fields.email.isTouched ? t(form.fields.email.errors[0]?.message ?? '') : ''}
        >
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.fields.email.value}
            onChange={(event) => form.fields.email.changed(event.target.value)}
            onBlur={() => form.fields.email.blurred()}
            placeholder={t('EMAIL_PLACEHOLDER')}
            fullWidth
          />
        </Field>

        <Field
          label={t('PASSWORD_LABEL')}
          isInvalid={(form.fields.password.isTouched && form.fields.password.hasErrors) || !!form.formErrors.length}
          description={form.fields.password.isTouched ? t(form.fields.password.errors[0]?.message ?? '') : ''}
        >
          <InputPassword
            id="password"
            name="password"
            value={form.fields.password.value}
            onChange={(event) => form.fields.password.changed(event.target.value)}
            onBlur={() => form.fields.password.blurred()}
            placeholder={t('PASSWORD_PLACEHOLDER')}
            passwordIconLabel=""
            autoComplete="current-password"
            fullWidth
          />
        </Field>

        {form.formErrors.map((err) => (
          <Text variant="xs" color="error.error11" key={err.message}>
            {t([`auth:${err.message}`, `common:${err.message}`])}
          </Text>
        ))}

        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          {t('LOGIN')}
        </Button>
      </Stack>

      <Text variant="s">
        {t('NEED_ACCOUNT')}{' '}
        <Link href="/auth/signup" component={NextLink}>
          {t('SIGNUP')}
        </Link>
      </Text>
    </Box>
  );
};
