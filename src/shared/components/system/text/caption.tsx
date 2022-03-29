import * as React from 'react';
import { ColorProps, TypographyProps } from 'styled-system';

import { SxProp } from '@/shared/lib/css-in-js/sx';
import { PolymorphicComponent } from '@/shared/lib/react/types/polymorphic';
import { captions } from '@/shared/design/tokens/typography';

import * as S from './styled';

type SystemProps = SxProp & ColorProps & TypographyProps;

export interface CaptionProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>, SystemProps {
  /**
   * The variant of the Caption.
   */
  variant?: keyof typeof captions;
}

export const Caption: PolymorphicComponent<CaptionProps, 'span'> = React.forwardRef((props, ref): JSX.Element => {
  const {
    children,
    variant = 'caption1',
    component,
    ...other
  } = props;

  return (
    // @ts-expect-error color attr type error
    <S.CaptionRoot as={component} variant={variant} {...other} ref={ref}>{children}</S.CaptionRoot>
  );
});
