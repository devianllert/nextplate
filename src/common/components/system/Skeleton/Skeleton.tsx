/* eslint-disable prefer-arrow-callback */

import { OverridableComponent } from '@/modules/core/react/types/OverridableComponent';
import React, { ReactNode, forwardRef } from 'react';

import * as S from './styled';

export interface SkeletonProps {
  /**
   * Optional children to infer width and height from.
   */
  children?: ReactNode,
  /**
   * The animation.
   * If `false` the animation effect is disabled.
   */
  animation?: 'pulse' | 'wave' | false;
  /**
   * The type of content that will be rendered.
   */
  variant?: 'text' | 'rectangular' | 'circular';
  /**
   * Height of the skeleton.
   * Useful when you don't want to adapt the skeleton to a text element but for instance a card.
   */
  height?: number | string;
  /**
   * Width of the skeleton.
   * Useful when the skeleton is inside an inline element with no width of its own.
   */
  width?: number | string;
}

interface SkeletonTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & SkeletonProps;
  defaultComponent: D
}

/**
 * Display a placeholder preview of your content before the data gets loaded to reduce load-time frustration.
 *
 * The data for your components might not be immediately available.
 * You can increase the perceived performance for users by using skeletons.
 * It feels like things are happening immediately, then the information is incrementally displayed on the screen.
 *
 * @example
 * <Card>
 *  <CardHeader>
 *    <Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />
 *    <Skeleton height={10} width="40%" />
 *  </CardHeader>
 *
 *  <Skeleton variant="rect" height={140} />
 * </Card>
 */
export const Skeleton: OverridableComponent<SkeletonTypeMap> = forwardRef(function Skeleton(props, ref) {
  const {
    animation = 'pulse',
    className,
    component = 'span',
    height,
    style,
    variant = 'text',
    width,
    ...other
  } = props;

  const hasChildren = Boolean(other.children);

  return (
    <S.SkeletonRoot
      as={component}
      ref={ref}
      animation={animation}
      variant={variant}
      className={className}
      hasChildren={hasChildren}
      {...other}
      style={{
        width,
        height,
        ...style,
      }}
    />
  );
});
