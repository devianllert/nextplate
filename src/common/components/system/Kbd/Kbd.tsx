import * as React from 'react';

import * as S from './styled';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The content.
   */
  children: React.ReactNode;

  /**
   * The size of the component.
   */
  size?: 'small' | 'medium';
}

/**
 * The `Kbd` component is used to show which key or combination of keys performs a given action.
 */
export const Kbd = React.forwardRef((props: KbdProps, ref: React.ForwardedRef<HTMLElement>): JSX.Element => {
  const {
    children,
    size = 'medium',
    ...other
  } = props;

  return (
    <S.KbdRoot size={size} ref={ref} {...other}>{children}</S.KbdRoot>
  );
});
