import * as React from 'react';

import { OverridableComponent } from '@/modules/core/react/types/OverridableComponent';
import { headings } from '@/common/design/tokens/typography';

import * as S from './styled';

export interface HeadingProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>, Omit<S.TextBaseProps, 'variant'> {
  /**
   * The variant of the Heading.
   */
  variant?: keyof typeof headings;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface HeadingTypeMap<P = {}, D extends React.ElementType = 'h1'> {
  props: P & HeadingProps;
  defaultComponent: D;
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

export const Heading: OverridableComponent<HeadingTypeMap> = React.forwardRef((props, ref): JSX.Element => {
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
