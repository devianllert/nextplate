import * as React from 'react';

import { PolymorphicComponent } from '@/shared/types/polymorphic';

import * as S from './status.styled';

export interface StatusProps {
  /**
   * The size of the component.
   */
  size?: 'medium' | 'small';

  /**
   * The color of the component.
   */
  color?: string;
}

/**
 * The `Status` component is used to highlight an item's status for quick recognition.
 */
export const Status: PolymorphicComponent<StatusProps, 'div'> = React.forwardRef((props, forwardedRef) => {
  const {
    size,
    color = 'gray',
    component,
  } = props;

  return (
    <S.StatusRoot
      size={size}
      color={color}
      as={component}
      ref={forwardedRef}
    />
  );
});
