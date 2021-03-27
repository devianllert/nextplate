/* eslint-disable prefer-arrow-callback */
import { OverridableComponent } from '@/modules/core/react/types/OverridableComponent';
import React, {
  ReactNode,
  ElementType,
  forwardRef,
} from 'react';

import * as S from './styled';

export interface ButtonBaseProps {
  /**
   * The content
   */
  children: ReactNode;
  /**
   * Convert button to link
   */
  href?: string;
}

export interface ButtonBaseTypeMap<P = {}, D extends ElementType = 'button'> {
  props: P & ButtonBaseProps;
  defaultComponent: D;
}

/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 */
const ButtonBase: OverridableComponent<ButtonBaseTypeMap> = forwardRef((props, ref) => {
  const {
    children,
    className,
    component = 'button',
    disabled = false,
    tabIndex = 0,
    type,
    ...other
  } = props;

  let ComponentProp = component;

  if (ComponentProp === 'button' && other.href) {
    ComponentProp = 'a';
  }

  return (
    <S.ButtonBaseRoot
      as={ComponentProp}
      className={className}
      ref={ref}
      tabIndex={disabled ? -1 : tabIndex}
      disabled={disabled}
      aria-disabled={disabled}
      type={type ?? 'button'}
      {...other}
    >
      {children}
    </S.ButtonBaseRoot>
  );
});

export default ButtonBase;
