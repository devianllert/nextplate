import NextLink from 'next/link';
import { Box, Button, Divider, Field, Heading, Input, Link, Stack, Text } from '@effable/react';
import { useUnit } from 'effector-react';
import { useTranslation } from 'next-i18next';

import { registerFx } from '@/entities/auth';

import { GithubButton } from '@/shared/components/github-button';
import { GoogleButton } from '@/shared/components/google-button';
import { InputPassword } from '@/shared/components/system/input/input-password';
import { useForm } from '@/shared/lib/effector/forms';

import { registerForm } from './register.model';

export const RegisterForm = () => {
  const { t } = useTranslation(['auth', 'common']);
  const isSubmitting = useUnit(registerFx.pending);

  const form = useForm(registerForm);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    form.submit();
  };

  return (
    <Box component="form" maxWidth="440px" width="100%" onSubmit={onSubmit}>
      <Heading variant="h1" component="h1" sx={{ mb: '4x' }}>
        {t('SIGNUP')}
      </Heading>

      <Stack direction="column">
        <GoogleButton />
        <GithubButton />
      </Stack>

      <Divider mt="4x" mb="4x" label="OR" />

      <Stack direction="column">
        <Field
          isInvalid={(form.fields.email.isTouched && form.fields.email.hasErrors) || !!form.formErrors.length}
          label={t('EMAIL_LABEL')}
          description={form.fields.email.isTouched ? t(form.fields.email.errors[0]?.message ?? '') : ''}
        >
          <Input
            id="email"
            name="email"
            type="email"
            value={form.fields.email.value}
            onChange={(event) => form.fields.email.changed(event.target.value)}
            onBlur={() => form.fields.email.blurred()}
            placeholder={t('EMAIL_PLACEHOLDER')}
            autoComplete="email"
            fullWidth
          />
        </Field>

        <Field
          isInvalid={(form.fields.username.isTouched && form.fields.username.hasErrors) || !!form.formErrors.length}
          description={form.fields.username.isTouched ? t(form.fields.username.errors[0]?.message ?? '') : ''}
          label={t('USERNAME_LABEL')}
        >
          <Input
            id="name"
            name="name"
            value={form.fields.username.value}
            onChange={(event) => form.fields.username.changed(event.target.value)}
            onBlur={() => form.fields.username.blurred()}
            placeholder={t('USERNAME_PLACEHOLDER')}
            autoComplete="username"
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

        {/* <InputPassword
          id="confirmPassword"
          autoComplete="new-password"
          placeholder={t('form.confirmPassword.placeholder')}
          name="confirmPassword"
          label={t('form.confirmPassword.label')}
          fullWidth
        /> */}

        {form.formErrors.map((err) => (
          <Text variant="xs" color="error.error11" key={err.message}>
            {t([`auth:${err.message}`, `common:${err.message}`])}
          </Text>
        ))}

        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          {t('SIGNUP')}
        </Button>
      </Stack>

      <Text variant="s">
        <Link href="/auth/login" component={NextLink}>
          {t('HAVE_ACCOUNT')}
        </Link>
      </Text>
    </Box>
  );
};
