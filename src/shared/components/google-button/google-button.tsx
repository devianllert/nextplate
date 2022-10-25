import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { RiGoogleFill } from 'react-icons/ri';
import { Box } from '../system/box';

import * as S from './google-button.styled';

export interface GoogleButtonProps {
  redirectTo?: string;
}

export const GoogleButton = (props: GoogleButtonProps): JSX.Element => {
  const {
    redirectTo = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  } = props;

  const { t } = useTranslation('auth');

  const redirectUrl = redirectTo?.startsWith('http') ? redirectTo : `${process.env.NEXT_PUBLIC_APP_URL}/${redirectTo}`;

  const handleClick = () => {
    window.location.assign(`http://localhost:8888/api/v1/auth/google?from=${redirectUrl}`);
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