import * as React from 'react';
import { Box } from '@effable/react';
import { useTranslation } from 'next-i18next';
import { RiGithubFill } from 'react-icons/ri';

import * as S from './github-button.styled';

export interface GithubButtonProps {
  redirectTo?: string;
}

export const GithubButton = (props: GithubButtonProps) => {
  const { redirectTo = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard` } = props;

  const { t } = useTranslation('auth');

  const redirectUrl = redirectTo?.startsWith('http') ? redirectTo : `${process.env.NEXT_PUBLIC_APP_URL}/${redirectTo}`;

  const handleClick = () => {
    window.location.assign(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/auth/github?from=${redirectUrl}`);
  };

  return (
    <S.GithubButtonRoot onClick={handleClick}>
      <Box mr={2}>
        <RiGithubFill size={20} />
      </Box>

      {t('OAUTH_GITHUB')}
    </S.GithubButtonRoot>
  );
};
