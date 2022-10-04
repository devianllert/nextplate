import { useTranslation } from 'next-i18next';
import NextLink from 'next/link';
import { useUnit } from 'effector-react/scope';

import { Stack } from '@/shared/components/system/stack';
import { Box } from '@/shared/components/system/box';
import { Text } from '@/shared/components/system/text';
import { Input, InputPassword } from '@/shared/components/system/input';
import { Link } from '@/shared/components/system/link';
import { Button } from '@/shared/components/system/button';
import { useForm } from '@/shared/lib/effector/forms';
import { registerForm } from './register.model';
import { registerFx } from '@/entities/auth';

export const RegisterForm = () => {
  const { t } = useTranslation('auth');
  const isSubmitting = useUnit(registerFx.pending);

  const form = useForm(registerForm);

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
      <Text.Heading variant="h3" component="h1" sx={{ mb: 4 }}>{t('signup')}</Text.Heading>

      <Stack direction="column">
        <Input
          id="email"
          name="email"
          type="email"
          onChange={(event) => form.fields.email.changed(event.target.value)}
          onBlur={() => form.fields.email.blurred()}
          error={(form.fields.email.isTouched && form.fields.email.hasErrors) || !!form.formErrors.length}
          helperText={form.fields.email.isTouched ? form.fields.email.errors[0]?.message : ''}
          placeholder={t('form.email.placeholder')}
          label={t('form.email.label')}
          fullWidth
        />
        <Input
          id="name"
          name="name"
          value={form.fields.username.value}
          onChange={(event) => form.fields.username.changed(event.target.value)}
          onBlur={() => form.fields.username.blurred()}
          error={(form.fields.username.isTouched && form.fields.username.hasErrors) || !!form.formErrors.length}
          helperText={form.fields.username.isTouched ? form.fields.username.errors[0]?.message : ''}
          placeholder={t('form.name.placeholder')}
          autoComplete="username"
          label={t('form.name.label')}
          fullWidth
        />
        <InputPassword
          id="password"
          name="password"
          value={form.fields.password.value}
          onChange={(event) => form.fields.password.changed(event.target.value)}
          onBlur={() => form.fields.password.blurred()}
          error={(form.fields.password.isTouched && form.fields.password.hasErrors) || !!form.formErrors.length}
          helperText={form.fields.password.isTouched ? form.fields.password.errors[0]?.message : ''}
          placeholder={t('form.password.placeholder')}
          autoComplete="new-password"
          label={t('form.password.label')}
          fullWidth
        />
        <InputPassword
          id="confirmPassword"
          autoComplete="new-password"
          placeholder={t('form.confirmPassword.placeholder')}
          name="confirmPassword"
          label={t('form.confirmPassword.label')}
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
          {t('signup')}
        </Button>
      </Stack>

      <Text.Paragraph variant="body2">
        <NextLink href="/auth/login" passHref>
          <Link href="/auth/login">{t('haveAccount')}</Link>
        </NextLink>
      </Text.Paragraph>
    </Box>
  );
};
