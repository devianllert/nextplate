import * as React from 'react';

import { OverridableComponent } from '@/modules/core/react/types/OverridableComponent';
import { overlines } from '@/common/design/tokens/typography';

import * as S from './styled';

export interface OverlineProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>, Omit<S.TextBaseProps, 'variant'> {
  /**
   * The variant of the Overline.
   */
  variant?: keyof typeof overlines;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface OverlineTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & OverlineProps;
  defaultComponent: D;
}

export const Overline: OverridableComponent<OverlineTypeMap> = React.forwardRef((props, ref): JSX.Element => {
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
