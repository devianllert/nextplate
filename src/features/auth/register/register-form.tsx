import { useTranslation } from 'next-i18next';
import NextLink from 'next/link';
import { useUnit } from 'effector-react/scope';

import { Stack } from '@/shared/components/system/stack';
import { Box } from '@/shared/components/system/box';
import { Divider } from '@/shared/components/system/divider';
import { Text } from '@/shared/components/system/text';
import { Input, InputPassword } from '@/shared/components/system/input';
import { Link } from '@/shared/components/system/link';
import { Button } from '@/shared/components/system/button';
import { useForm } from '@/shared/lib/effector/forms';
import { registerForm } from './register.model';
import { registerFx } from '@/entities/auth';
import { GithubButton } from '@/shared/components/github-button';
import { GoogleButton } from '@/shared/components/google-button';

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
      <Text.Heading variant="h3" component="h1" sx={{ mb: 4 }}>
        {t('SIGNUP')}
      </Text.Heading>

      <Stack direction="column">
        <GoogleButton />
        <GithubButton />
      </Stack>

      <Divider space={4} />

      <Stack direction="column">
        <Input
          id="email"
          name="email"
          type="email"
          value={form.fields.email.value}
          onChange={(event) => form.fields.email.changed(event.target.value)}
          onBlur={() => form.fields.email.blurred()}
          error={(form.fields.email.isTouched && form.fields.email.hasErrors) || !!form.formErrors.length}
          helperText={form.fields.email.isTouched ? t(form.fields.email.errors[0]?.message) : ''}
          placeholder={t('EMAIL_PLACEHOLDER')}
          label={t('EMAIL_LABEL')}
          autoComplete="email"
          fullWidth
        />

        <Input
          id="name"
          name="name"
          value={form.fields.username.value}
          onChange={(event) => form.fields.username.changed(event.target.value)}
          onBlur={() => form.fields.username.blurred()}
          error={(form.fields.username.isTouched && form.fields.username.hasErrors) || !!form.formErrors.length}
          helperText={form.fields.username.isTouched ? t(form.fields.username.errors[0]?.message) : ''}
          placeholder={t('USERNAME_PLACEHOLDER')}
          autoComplete="username"
          label={t('USERNAME_LABEL')}
          fullWidth
        />

        <InputPassword
          id="password"
          name="password"
          value={form.fields.password.value}
          onChange={(event) => form.fields.password.changed(event.target.value)}
          onBlur={() => form.fields.password.blurred()}
          error={(form.fields.password.isTouched && form.fields.password.hasErrors) || !!form.formErrors.length}
          helperText={form.fields.password.isTouched ? t(form.fields.password.errors[0]?.message) : ''}
          placeholder={t('PASSWORD_PLACEHOLDER')}
          autoComplete="new-password"
          label={t('PASSWORD_LABEL')}
          fullWidth
        />

        {/* <InputPassword
          id="confirmPassword"
          autoComplete="new-password"
          placeholder={t('form.confirmPassword.placeholder')}
          name="confirmPassword"
          label={t('form.confirmPassword.label')}
          fullWidth
        /> */}

        {form.formErrors.map((err) => (
          <Text.Paragraph variant="body3" color="radix.red11" key={err.message}>
            {t([`auth:${err.message}`, `common:${err.message}`])}
          </Text.Paragraph>
        ))}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disableElevation
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {t('SIGNUP')}
        </Button>
      </Stack>

      <Text.Paragraph variant="body2">
        <Link href="/auth/login" component={NextLink}>{t('HAVE_ACCOUNT')}</Link>
      </Text.Paragraph>
    </Box>
  );
};
