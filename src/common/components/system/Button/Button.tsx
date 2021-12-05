/* eslint-disable prefer-arrow-callback */
import * as React from 'react';

import { PolymorphicComponent } from '@/modules/core/react/types/Polymorphic';

import { ButtonBaseProps } from '../ButtonBase';

import * as S from './styled';

export interface ButtonProps extends ButtonBaseProps {
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
   * The color of the button.
   *
   * @default 'primary'
   */
  color?: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface ButtonTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & ButtonProps;
  defaultComponent: D
}

/**
 * The `Button` component is used to trigger an action or event.
 */
export const Button: PolymorphicComponent<ButtonProps, 'button'> = React.forwardRef(function Button(props, ref) {
  const {
    children,
    component: Component,
    color = 'primary',
    variant = 'text',
    type,
    disableElevation,
    disabled,
    startIcon: startIconProp,
    endIcon: endIconProp,
    fullWidth = false,
    ...other
  } = props;

  const startIcon = startIconProp && (
    <S.ButtonStartIcon>
      {startIconProp}
    </S.ButtonStartIcon>
  );

  const endIcon = endIconProp && (
    <S.ButtonEndIcon>
      {endIconProp}
    </S.ButtonEndIcon>
  );

  return (
    <S.ButtonRoot
      component={Component}
      disableElevation={disableElevation}
      ref={ref}
      variant={variant}
      color={color}
      disabled={disabled}
      fullWidth={fullWidth}
      {...other}
    >
      {startIcon}
      {children}
      {endIcon}
    </S.ButtonRoot>
  );
});
