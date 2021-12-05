import * as React from 'react';

import { PolymorphicComponent } from '@/modules/core/react/types/Polymorphic';

import * as S from './styled';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   *  If `true`, the link will open in new tab
   */
  external?: boolean;
}

/**
 * Links are accessible elements used primarily for navigation.
 *
 * It integrates well with other routing libraries like
 * React Router, Reach Router and Next.js Link.
 */
export const Link: PolymorphicComponent<LinkProps, 'a'> = React.forwardRef((props, ref) => {
  const {
    children,
    component,
    external,
    ...other
  } = props;

  return (
    <S.LinkRoot
      as={component}
      ref={ref}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...other}
    >
      {children}
    </S.LinkRoot>
  );
});
