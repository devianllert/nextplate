import * as React from 'react';

import * as S from './styled';

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The content.
   */
  children?: React.ReactNode;

  /**
   * The color of the code.
   */
  color?: string;
}

/**
 * Inline code without syntax highlight
 */
export const Code = React.forwardRef((props: CodeProps, ref: React.ForwardedRef<HTMLElement>): JSX.Element => {
  const {
    children,
    color = 'primary',
    ...other
  } = props;

  return (
    <S.CodeRoot color={color} ref={ref} {...other}>{children}</S.CodeRoot>
  );
});
