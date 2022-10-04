import * as React from 'react';
import { useTranslation } from 'next-i18next';
import NextLink from 'next/link';
import { useUnit } from 'effector-react/scope';

import { Button } from '@/shared/components/system/button';
import * as Text from '@/shared/components/system/text';
import { Box } from '@/shared/components/system/box';
import { Input, InputPassword } from '@/shared/components/system/input';
import { Stack } from '@/shared/components/system/stack';
import { Link } from '@/shared/components/system/link';
import { loginFx } from '@/entities/auth';
import { useForm } from '@/shared/lib/effector/forms';

import { loginForm } from './login.model';

export const LoginForm = () => {
  const { t } = useTranslation('auth');
  const isSubmitting = useUnit(loginFx.pending);

  const form = useForm(loginForm);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    form.submit();
  };

  return (
    <Box
      component="form"
      maxWidth="440px"
      width="100%"
      onSubmit={onSubmit}
    >
      <Text.Heading variant="h4" component="h1" sx={{ mb: 4 }}>{t('login')}</Text.Heading>

      <Stack direction="column">
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.fields.email.value}
          error={(form.fields.email.isTouched && form.fields.email.hasErrors) || !!form.formErrors.length}
          helperText={form.fields.email.isTouched ? form.fields.email.errors[0]?.message : ''}
          onChange={(event) => form.fields.email.changed(event.target.value)}
          onBlur={() => form.fields.email.blurred()}
          placeholder={t('form.email.placeholder')}
          label={t('form.email.label')}
          fullWidth
        />

        <InputPassword
          id="password"
          name="password"
          value={form.fields.password.value}
          error={(form.fields.password.isTouched && form.fields.password.hasErrors) || !!form.formErrors.length}
          helperText={form.fields.password.isTouched ? form.fields.password.errors[0]?.message : ''}
          onChange={(event) => form.fields.password.changed(event.target.value)}
          onBlur={() => form.fields.password.blurred()}
          placeholder={t('form.password.placeholder')}
          autoComplete="current-password"
          label={t('form.password.label')}
          fullWidth
        />

        {form.formErrors.length > 0 && (
          <Text.Paragraph variant="body3" color="radix.red11">
            Incorrect email or password
          </Text.Paragraph>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disableElevation
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {t('login')}
        </Button>
      </Stack>

      <Text.Paragraph variant="body2">
        {t('needAccount')}
        {' '}
        <NextLink href="/auth/signup" passHref>
          <Link href="/auth/signup">{t('signup')}</Link>
        </NextLink>
      </Text.Paragraph>
    </Box>
  );
};
