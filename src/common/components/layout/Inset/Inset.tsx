import * as React from 'react';
import { ResponsiveValue } from 'styled-system';

import { PolymorphicComponent } from '@/modules/core/react/types/Polymorphic';

import * as S from './styled';

export interface InsetProps {
  /**
   * The content
   */
  children: React.ReactNode;

  /**
   * The space for both axis.
   */
  space?: ResponsiveValue<number>;

  /**
   * The space for vertical axis.
   */
  vertical?: ResponsiveValue<number>;

  /**
   * The space for horizontal axis.
   */
  horizontal?: ResponsiveValue<number>;
}

/**
 * The `Inset` component is used to render a container with equal padding on each axis.
 */
export const Inset: PolymorphicComponent<InsetProps, 'div'> = React.forwardRef((props, ref) => {
  const {
    children,
    component = 'div',
    ...other
  } = props;

  return (
    <S.InsetRoot
      as={component}
      ref={ref}
      {...other}
    >
      {children}
    </S.InsetRoot>
  );
});
