import * as React from 'react';

import { PolymorphicComponent } from '@/modules/core/react/types/Polymorphic';

import * as S from './styled';

export interface BoxProps extends S.BoxType {
  /**
   * The content
   */
  children?: React.ReactNode;
}

/**
 * The Box component serves as a wrapper component for most of the CSS utility needs.
 */
export const Box: PolymorphicComponent<BoxProps, 'div'> = React.forwardRef((props, ref) => {
  const {
    children,
    component = 'div',
    ...other
  } = props;

  return (
    // @ts-expect-error color attr type error
    <S.BoxRoot as={component} {...other} ref={ref}>{children}</S.BoxRoot>
  );
});
