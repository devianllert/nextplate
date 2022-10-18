import { AvatarImageProps } from '@radix-ui/react-avatar';
import * as React from 'react';
import { SizeProps } from '@/shared/design/tokens/size';

import * as S from './avatar.styled';

export interface AvatarProps extends AvatarImageProps, SizeProps {
  fallback?: React.ReactNode;
}

export const Avatar = (props: AvatarProps): JSX.Element => {
  const {
    fallback,
    size = 'medium',
    ...other
  } = props;

  return (
    <S.AvatarRoot size={size}>
      <S.AvatarImage {...other} />
      <S.AvatarFallback delayMs={500} size={size}>{fallback}</S.AvatarFallback>
    </S.AvatarRoot>
  );
};
