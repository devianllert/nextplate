import * as React from 'react';
import { Spinner } from '@effable/react';

import * as S from './loading-overlay.styled';

export interface LoadingOverlayProps {
  /**
   * Provide custom loader.
   */
  loader?: React.ReactNode;
}

/**
 * The `LoadingOverlay` component is used to show overlay over given container with centered Loader.
 */
export const LoadingOverlay = (props: LoadingOverlayProps) => {
  const { loader = <Spinner size={32} /> } = props;

  return <S.LoadingOverlayRoot>{loader}</S.LoadingOverlayRoot>;
};
