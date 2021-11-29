import * as React from 'react';
import { FlexboxProps, LayoutProps } from 'styled-system';

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
export const Flex = (props: FlexProps): JSX.Element => {
  const {
    children,
    ...other
  } = props;

  return (
    <S.FlexRoot {...other}>{children}</S.FlexRoot>
  );
};
