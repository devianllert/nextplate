import * as React from 'react';

import { SpaceProps } from '@/modules/core/css-in-js/space';

import * as S from './styled';

export interface BoxProps extends SpaceProps {
  /**
   * The content
   */
  children: React.ReactNode;
}

export const Box = (props: BoxProps): JSX.Element => {
  const {
    children,
    ...other
  } = props;

  return (
    <S.BoxRoot {...other}>{children}</S.BoxRoot>
  );
};
