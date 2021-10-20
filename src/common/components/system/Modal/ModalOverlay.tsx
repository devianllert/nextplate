/* eslint-disable prefer-arrow-callback */
import * as React from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { blackA } from '@radix-ui/colors';

import { duration } from '@/common/design/tokens/transitions';
import { zIndex } from '@/common/design/tokens/zIndex';
import { Box } from '@/common/components/system/Box';

import { useModalContext } from './ModalContext';

const overlay = {
  enter: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { type: 'spring', bounce: 0, duration: duration.short / 1000 },
};

/**
 * ModalOverlay renders a backdrop behind the modal.
 */
export const ModalOverlay = React.forwardRef(function ModalOverlay(props: HTMLMotionProps<'div'>, ref: React.ForwardedRef<HTMLDivElement>): JSX.Element {
  const {
    initial = 'exit',
    exit = 'exit',
    animate = 'enter',
    transition = overlay.transition,
    variants = overlay,
    ...other
  } = props;

  const { shouldReduceMotion } = useModalContext('ModalOverlay');

  const animationConfig = {
    initial: shouldReduceMotion ? 'enter' : initial,
    exit: shouldReduceMotion ? 'enter' : exit,
    animate: shouldReduceMotion ? 'enter' : animate,
    transition: shouldReduceMotion ? { duration: 0 } : transition,
    variants,
  };

  return (
    <Box
      component={motion.div}
      position="fixed"
      top={0}
      left={0}
      display="flex"
      width="100%"
      height="100%"
      background={blackA.blackA9}
      ref={ref}
      zIndex={zIndex.modal}
      {...animationConfig}
      {...other}
    />
  );
});
