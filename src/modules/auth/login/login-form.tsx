import * as React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { useEvent, useStore, useUnit } from 'effector-react/scope';

import { Button } from '@/shared/components/system/button';
import * as Text from '@/shared/components/system/text';
import { Box } from '@/shared/components/system/box';
import { Input } from '@/shared/components/system/input';
import { Stack } from '@/shared/components/system/stack';
import { useBoolean } from '@/shared/hooks/use-boolean';
import { IconButton } from '@/shared/components/system/icon-button';
import { loginFx } from '@/entities/auth/auth.model';
import {
  loginForm,
} from './login.model';
import { useForm } from '@/shared/lib/effector/forms';

export const LoginForm = () => {
  const { t } = useTranslation('auth');
  const [show, toggleShow] = useBoolean(false);
  const isSubmitting = useStore(loginFx.pending);

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
      <Button onClick={() => form.reset()}>reset</Button>
      <Text.Heading variant="h4" component="h1" sx={{ mb: 4 }}>{t('login')}</Text.Heading>

      <Stack direction="column">
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.fields.email.$value}
          error={form.fields.email.$isTouched && form.fields.email.$hasErrors}
          helperText={form.fields.email.$isTouched ? form.fields.email.$errors[0]?.message : ''}
          onChange={(event) => form.fields.email.changed(event.target.value)}
          onBlur={() => form.fields.email.blurred()}
          placeholder={t('form.email.placeholder')}
          label={t('form.email.label')}
          fullWidth
        />

        <Input
          id="password"
          name="password"
          type={show ? 'text' : 'password'}
          value={form.fields.password.$value}
          error={form.fields.password.$isTouched && form.fields.password.$hasErrors}
          helperText={form.fields.password.$isTouched ? form.fields.password.$errors[0]?.message : ''}
          onChange={(event) => form.fields.password.changed(event.target.value)}
          onBlur={() => form.fields.password.blurred()}
          suffix={(
            <IconButton onClick={() => toggleShow()} size="small">
              {show ? <RiEyeLine /> : <RiEyeOffLine />}
            </IconButton>
            )}
          placeholder={t('form.password.placeholder')}
          autoComplete="current-password"
          label={t('form.password.label')}
          fullWidth
        />

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
        <Link href="/auth/signup">{t('signup')}</Link>
      </Text.Paragraph>
    </Box>
  );
};
