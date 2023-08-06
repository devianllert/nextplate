import React from 'react';
import { Variants as _Variants, AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';

import { TransitionDefaults, Variants, withDelay, WithTransitionConfig } from '@/shared/lib/transition';

export type FadeProps = WithTransitionConfig<HTMLMotionProps<'div'>>;

const variants: Variants = {
  enter: ({ transition, transitionEnd, delay } = {}) => ({
    opacity: 1,
    transition: transition?.enter ?? withDelay.enter(TransitionDefaults.enter, delay),
    transitionEnd: transitionEnd?.enter,
  }),
  exit: ({ transition, transitionEnd, delay } = {}) => ({
    opacity: 0,
    transition: transition?.exit ?? withDelay.exit(TransitionDefaults.exit, delay),
    transitionEnd: transitionEnd?.exit,
  }),
};

export const fadeConfig: HTMLMotionProps<'div'> = {
  initial: 'exit',
  animate: 'enter',
  exit: 'exit',
  variants: variants as _Variants,
};

/**
 * The `Fade` component is used to fade in from transparent to opaque.
 */
export const Fade = React.forwardRef<HTMLDivElement, FadeProps>((props, ref) => {
  const { unmountOnExit, in: isOpen, className, transition, transitionEnd, delay, ...rest } = props;

  const animate = isOpen || unmountOnExit ? 'enter' : 'exit';
  const show = unmountOnExit ? isOpen && unmountOnExit : true;

  const custom = { transition, transitionEnd, delay };

  return (
    <AnimatePresence custom={custom}>
      {show && <motion.div ref={ref} custom={custom} {...fadeConfig} animate={animate} {...rest} />}
    </AnimatePresence>
  );
});
