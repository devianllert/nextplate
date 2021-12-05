import * as React from 'react';

import { PolymorphicComponent } from '@/modules/core/react/types/Polymorphic';
import { headings } from '@/common/design/tokens/typography';

import * as S from './styled';

export interface HeadingProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>, Omit<S.TextBaseProps, 'variant'> {
  /**
   * The variant of the Heading.
   */
  variant?: keyof typeof headings;
}

export const variantMapping: Record<keyof typeof headings, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
};

export const Heading: PolymorphicComponent<HeadingProps, 'h1'> = React.forwardRef((props, ref) => {
  const {
    children,
    variant = 'h1',
    component,
    ...other
  } = props;

  const Component = component
  || variantMapping[variant]
  || 'span';

  return (
    // @ts-expect-error color attr type error
    <S.HeadingRoot as={Component} variant={variant} {...other} ref={ref}>{children}</S.HeadingRoot>
  );
});
