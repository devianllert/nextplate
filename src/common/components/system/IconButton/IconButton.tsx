/* eslint-disable prefer-arrow-callback */
import React, { forwardRef } from 'react';

import { OverridableComponent } from '@/modules/core/react/types/OverridableComponent';

import { ButtonBaseProps } from '../ButtonBase';

import * as S from './styled';

export interface IconButtonTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & ButtonBaseProps;
  defaultComponent: D;
}

const IconButton: OverridableComponent<IconButtonTypeMap> = forwardRef(function IconButton(props, ref) {
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

export default IconButton;
