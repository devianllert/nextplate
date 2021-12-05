import * as React from 'react';

import { PolymorphicComponent } from '@/modules/core/react/types/Polymorphic';
import { paragraphs } from '@/common/design/tokens/typography';

import * as S from './styled';

export interface ParagraphProps extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>, Omit<S.TextBaseProps, 'variant'> {
  /**
   * The variant of the Paragraph or Body text.
   */
  variant?: keyof typeof paragraphs;
}

export const Paragraph: PolymorphicComponent<ParagraphProps, 'p'> = React.forwardRef((props, ref): JSX.Element => {
  const {
    children,
    variant = 'body1',
    component = 'p',
    ...other
  } = props;

  return (
    // @ts-expect-error color attr type error
    <S.ParagraphRoot as={component} variant={variant} {...other} ref={ref}>{children}</S.ParagraphRoot>
  );
});

export {
  Paragraph as Body,
};

export type {
  ParagraphProps as BodyProps,
};
