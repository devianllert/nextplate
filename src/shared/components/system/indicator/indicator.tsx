import * as React from 'react';

import * as S from './indicator.styled';
import { IndicatorPosition } from './indicator.types';

export interface IndicatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /**
   * Element that should have an indicator.
   */
  children: React.ReactNode;

  /**
   * Position relative to child element.
   */
  position?: IndicatorPosition;

  /**
   * Position offset, usually used when element has border-radius.
   */
  offset?: number;

  /**
   * Determines whether indicator container should be an inline element.
   */
  inline?: boolean;

  /**
   * The size of the indicator.
   */
  size?: number;

  /**
   * The label of the indicator.
   */
  label?: React.ReactNode;

  /**
   * The color of the component.
   */
  color?: string | null;

  /**
   * Determines whether indicator should have border.
   */
  border?: boolean;

  /**
   * The border color.
   */
  borderColor?: string;

  /**
   * When component is disabled it renders children without indicator.
   */
  disabled?: boolean;

  /**
   * Indicator z-index
   */
  zIndex?: number;

  /**
   * The shape of the component.
   */
  shape?: string;
}

/**
 * The `Indicator` component is used to display element at the corner of another element
 */
export const Indicator = React.forwardRef<HTMLDivElement, IndicatorProps>((props, forwardedRef) => {
  const {
    children,
    disabled,
    label,
    border,
    borderColor = 'gray1',
    position = 'top-end',
    offset = 0,
    shape: shapeProp = 'circle',
    inline = false,
    color = 'gray',
    zIndex = 1,
    size = 10,
  } = props;

  return (
    <S.IndicatorRoot ref={forwardedRef}>
      {!disabled && (
        <S.Indicator
          borderColor={borderColor}
          zIndex={zIndex}
          inline={inline}
          withLabel={typeof label === 'string'}
          withBorder={!!border}
          position={position}
          offset={offset}
          color={color ?? 'transparent'}
          size={size}
          shape={shapeProp}
        >
          {label}
        </S.Indicator>
      )}
      {children}
    </S.IndicatorRoot>
  );
});
