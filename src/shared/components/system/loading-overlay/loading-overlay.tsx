import * as React from 'react';

import * as S from './styled';

export interface LoadingOverlayProps {
  /**
   * Provide custom loader
   */
  loader?: React.ReactNode;
}

export const LoadingOverlay = (props: LoadingOverlayProps): JSX.Element => {
  const {
    loader,
  } = props;

  return (
    <S.LoadingOverlayRoot>{loader}</S.LoadingOverlayRoot>
  );
};
