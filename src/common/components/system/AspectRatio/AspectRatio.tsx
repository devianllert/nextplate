/* eslint-disable prefer-arrow-callback */
import * as React from 'react';

import * as S from './styled';

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content
   */
  children: React.ReactNode;

  /**
   * The desired ratio
   */
  ratio?: number;
}

/**
 * The `AspectRatio` component is used to display content within a desired ratio.
 */
export const AspectRatio = React.forwardRef(function AspectRatio(props: AspectRatioProps, ref: React.ForwardedRef<HTMLDivElement>): JSX.Element {
  const {
    children,
    ratio = 1 / 1,
    ...other
  } = props;

  return (
    <S.AspectRatioRoot ratio={ratio}>
      <S.AspectRatioChild ref={ref} {...other}>
        {children}
      </S.AspectRatioChild>
    </S.AspectRatioRoot>
  );
});
