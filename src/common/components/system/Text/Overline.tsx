import * as React from 'react';

import { PolymorphicComponent } from '@/modules/core/react/types/Polymorphic';
import { overlines } from '@/common/design/tokens/typography';

import * as S from './styled';

export interface OverlineProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>, Omit<S.TextBaseProps, 'variant'> {
  /**
   * The variant of the Overline.
   */
  variant?: keyof typeof overlines;
}

export const Overline: PolymorphicComponent<OverlineProps, 'span'> = React.forwardRef((props, ref): JSX.Element => {
  const {
    children,
    variant = 'overline1',
    component,
    ...other
  } = props;

  return (
    // @ts-expect-error color attr type error
    <S.OverlineRoot as={component} variant={variant} {...other} ref={ref}>{children}</S.OverlineRoot>
  );
});
