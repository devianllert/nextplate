import * as React from 'react';
import { Box } from '@effable/react';
import { useTranslation } from 'next-i18next';
import { RiGoogleFill } from 'react-icons/ri';

import * as S from './google-button.styled';

export interface GoogleButtonProps {
  redirectTo?: string;
}

export const GoogleButton = (props: GoogleButtonProps) => {
  const { redirectTo = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard` } = props;

  const { t } = useTranslation('auth');

  const redirectUrl = redirectTo?.startsWith('http') ? redirectTo : `${process.env.NEXT_PUBLIC_APP_URL}/${redirectTo}`;

  const handleClick = () => {
    window.location.assign(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/auth/google?from=${redirectUrl}`);
  };

  return (
    <S.GoogleButtonRoot onClick={handleClick}>
      <Box mr={2}>
        <RiGoogleFill size={20} />
      </Box>

      {t('OAUTH_GOOGLE')}
    </S.GoogleButtonRoot>
  );
};
