/* eslint-disable prefer-arrow-callback */
import * as React from 'react';

import { PolymorphicComponent } from '@/modules/core/react/types/Polymorphic';
import { SxProp } from '@/modules/core/css-in-js/sx';

import * as S from './styled';

export interface ButtonBaseProps extends SxProp {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;

  /**
   * Convert button to link.
   *
   * @default undefined
   */
  href?: string;

  /**
   * The component used to render a link when the `href` prop is provided.
   *
   * @default 'a'
   */
  LinkComponent?: React.ElementType;

  /**
   * If `true`, the component is disabled.
   *
   * @default false
   */
  disabled?: boolean;
}

/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 */
export const ButtonBase: PolymorphicComponent<ButtonBaseProps, 'button'> = React.forwardRef(function ButtonBase(props, ref) {
  const {
    children,
    className,
    component = 'button',
    LinkComponent = 'a',
    disabled = false,
    tabIndex = 0,
    type,
    ...other
  } = props;

  let ComponentProp = component;

  if (ComponentProp === 'button' && other.href) {
    ComponentProp = LinkComponent;
  }

  const buttonProps: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> = {};

  if (ComponentProp === 'button') {
    buttonProps.type = type ?? 'button';
    buttonProps.disabled = disabled;
  } else {
    if (ComponentProp !== 'a' || !other.href) {
      buttonProps.role = 'button';
    }

    buttonProps['aria-disabled'] = disabled;
  }

  return (
    <S.ButtonBaseRoot
      as={ComponentProp}
      className={className}
      ref={ref}
      tabIndex={disabled ? -1 : tabIndex}
      type={type}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...buttonProps}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {children}
    </S.ButtonBaseRoot>
  );
});
