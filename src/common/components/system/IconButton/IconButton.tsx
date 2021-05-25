/* eslint-disable prefer-arrow-callback */
import * as React from 'react';

import { OverridableComponent } from '@/modules/core/react/types/OverridableComponent';

import { ButtonBaseProps } from '../ButtonBase';

import * as S from './styled';

export interface IconButtonTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & ButtonBaseProps;
  defaultComponent: D;
}

export const IconButton: OverridableComponent<IconButtonTypeMap> = React.forwardRef(function IconButton(props, ref) {
  const {
    children,
    ...other
  } = props;

  return (
    <S.IconButtonRoot {...other} ref={ref}>
      <S.IconButtonLabel>{children}</S.IconButtonLabel>
    </S.IconButtonRoot>
  );
});
