/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-arrow-callback */
import * as React from 'react';

import { OverridableComponent } from '@/modules/core/react/types/OverridableComponent';

import * as S from './styled';

export interface BoxProps extends S.BoxType {
  /**
   * The content
   */
  children: React.ReactNode;
}

export interface BoxTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & BoxProps;
  defaultComponent: D
}

export const Box: OverridableComponent<BoxTypeMap> = React.forwardRef(function Box(props, ref) {
  const {
    children,
    ...other
  } = props;

  return (
    <S.BoxRoot {...other} ref={ref}>{children}</S.BoxRoot>
  );
});
