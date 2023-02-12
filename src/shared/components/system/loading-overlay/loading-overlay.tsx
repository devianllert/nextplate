import * as React from 'react';

import { AnimatedSpinner } from '../../animations/animated-spinner';
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
export const LoadingOverlay = (props: LoadingOverlayProps): JSX.Element => {
  const { loader = <AnimatedSpinner /> } = props;

  return <S.LoadingOverlayRoot>{loader}</S.LoadingOverlayRoot>;
};
