import * as React from 'react';

import { useNetworkAvailability } from '@/modules/core/networkInformation/hooks/useNetworkAvailability';
import { Typography } from '@/common/components/system/Typography';

import { MainHeader } from '../MainHeader';

import * as S from './styled';

export interface MainLayoutProps {
  /**
   * The content
   */
  children?: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps): JSX.Element => {
  const {
    children,
  } = props;

  const isOnline = useNetworkAvailability();

  return (
    <S.Container>
      <MainHeader />

      {children}

      {!isOnline && (
        <S.OfflineStatusBar>
          <Typography>
            Your network is unavailable. Check your data or wifi connection.
          </Typography>
        </S.OfflineStatusBar>
      )}
    </S.Container>
  );
};
