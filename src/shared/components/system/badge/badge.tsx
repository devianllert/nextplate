import * as React from 'react';
import { TypographyProps } from 'styled-system';

import { PolymorphicComponent } from '@/shared/types/polymorphic';

import * as S from './badge.styled';

export interface BadgeProps extends TypographyProps {
  /**
   * The size of the component.
   */
  size?: 'medium' | 'small';

  /**
   * The shape of the component.
   */
  shape?: 'round' | 'circle';

  /**
   * The color of the component.
   */
  color?: string;

  /**
   * If true, the `Bagde` will appear interactive.
   */
  interactive?: boolean;

  /**
   * If true, the component is disabled.
   */
  disabled?: boolean;
}

/**
 * The `Badge` component is used to highlight an item's status for quick recognition.
 */
export const Badge: PolymorphicComponent<BadgeProps, 'span'> = React.forwardRef((props, forwardedRef) => {
  const {
    disabled,
    color = 'gray',
    size = 'medium',
    children,
    shape = 'circle',
    interactive,
    component,
    ...other
  } = props;

  return (
    <S.BadgeRoot
      as={component ?? interactive ? 'button' : 'span'}
      color={color}
      shape={shape}
      interactive={interactive}
      size={size}
      aria-disabled={disabled}
      {...other}
      ref={forwardedRef}
    >
      {children}
    </S.BadgeRoot>
  );
});
