import * as React from 'react';
import { FlexboxProps, LayoutProps } from 'styled-system';

import { PolymorphicComponent } from '@/modules/core/react/types/Polymorphic';

import * as S from './styled';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement>, FlexboxProps, LayoutProps {
  /**
   * The content
   */
  children: React.ReactNode;
}

/**
 * The `Flex` component is div with `display: flex` and comes with helpful style shorthand.
 */
export const Flex: PolymorphicComponent<FlexProps, 'div'> = React.forwardRef((props, ref) => {
  const {
    children,
    component,
    ...other
  } = props;

  return (
    <S.FlexRoot as={component} {...other} ref={ref}>{children}</S.FlexRoot>
  );
});
