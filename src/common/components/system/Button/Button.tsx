/* eslint-disable prefer-arrow-callback */
import * as React from 'react';

import { OverridableComponent } from '@/modules/core/react/types/OverridableComponent';

import * as S from './styled';

export interface ButtonProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * If `true`, the component is disabled.
   *
   * @default false
   */
  disabled?: boolean;
  /**
  * If `true`, no elevation is used.
  *
  * @default false
  */
  disableElevation?: boolean;
  /**
 * Element placed after the children.
 */
  endIcon?: React.ReactNode;
  /**
  * If `true`, the button will take up the full width of its container.
  *
  * @default false
  */
  fullWidth?: boolean;
  /**
  * The URL to link to when the button is clicked.
  * If defined, an `a` element will be used as the root node.
  */
  href?: string;
  /**
  * The size of the component.
  * `small` is equivalent to the dense button styling.
  *
  * @default 'medium'
  */
  size?: 'small' | 'medium' | 'large';
  /**
  * Element placed before the children.
  */
  startIcon?: React.ReactNode;
  /**
   * The variant to use.
   *
   * @default 'text'
   */
  variant?: 'text' | 'outlined' | 'contained';

  /**
   * The variant to use.
   *
   * @default 'primary'
   */
  color?: 'primary' | 'secondary';
}

export interface ButtonTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & ButtonProps;
  defaultComponent: D
}

export const Button: OverridableComponent<ButtonTypeMap> = React.forwardRef(function Button(props, ref) {
  const {
    children,
    component: Component,
    color = 'primary',
    variant = 'text',
    disableElevation,
    disabled,
    ...other
  } = props;

  return (
    <S.ButtonRoot
      as={Component}
      disableElevation={disableElevation}
      ref={ref}
      variant={variant}
      color={color}
      disabled={disabled}
      {...other}
    >
      {children}
    </S.ButtonRoot>
  );
});
