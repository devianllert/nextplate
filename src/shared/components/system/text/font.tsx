import * as React from 'react';

import { PolymorphicComponent } from '@/shared/types/polymorphic';

import * as S from './text.styled';

export type FontProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'> & Partial<S.TextBaseProps>;

export const Font: PolymorphicComponent<FontProps, 'span'> = React.forwardRef((props, ref) => {
  const {
    children,
    variant = 'span',
    component,
    ...other
  } = props;

  return (
    // @ts-expect-error color attr type error
    <S.FontRoot as={component} variant={variant} {...other} ref={ref}>{children}</S.FontRoot>
  );
});
