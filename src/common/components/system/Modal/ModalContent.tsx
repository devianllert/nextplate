import * as React from 'react';
import FocusTrap from 'focus-trap-react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { hideOthers } from 'aria-hidden';
import { RemoveScroll } from 'react-remove-scroll';

import { duration } from '@/common/design/tokens/transitions';
import { zIndex } from '@/common/design/tokens/zIndex';

import { Box } from '../Box';
import { useModalContext } from './ModalContext';
import { useComposedRefs } from '@/modules/core/react/composeRefs';

const content = {
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.75 },
  transition: { type: 'spring', bounce: 0, duration: duration.short / 1000 },
};

export interface ModalContentProps extends HTMLMotionProps<'div'> {
  /**
   * The content.
   */
  children: React.ReactNode;
  /**
   * classname for content block for styling purposes.
   */
  className?: string;
}

/**
 * ModalContent is used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it is a modal
 */
// eslint-disable-next-line prefer-arrow-callback
export const ModalContent = React.forwardRef(function ModalContent(props: ModalContentProps, ref: React.ForwardedRef<HTMLDivElement>): JSX.Element {
  const {
    children,
    className,
    initial = 'exit',
    exit = 'exit',
    animate = 'enter',
    transition = content.transition,
    variants = content,
    ...other
  } = props;

  const {
    trapFocus,
    shouldReduceMotion,
    contentRef,
    preserveScrollBarGap,
    blockScrollOnMount,
    allowPinchZoom,
  } = useModalContext('ModalContent');

  const modalRef = React.useRef<HTMLDivElement>(null);
  const composedRefs = useComposedRefs(contentRef, modalRef, ref);

  // aria-hide everything except the content (better supported equivalent to setting aria-modal)
  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    const dialog = modalRef.current;

    if (dialog) return hideOthers(dialog);
  }, []);

  const animationConfig = {
    initial,
    exit,
    animate,
    transition,
    variants,
  };

  const contentProps = {
    role: 'dialog',
    'aria-modal': true,
    tabindex: -1,
    ...other,
  };

  return (
    <FocusTrap paused={!trapFocus}>
      <RemoveScroll
        removeScrollBar={!preserveScrollBarGap}
        allowPinchZoom={allowPinchZoom}
        enabled={blockScrollOnMount}
        forwardProps
      >
        <Box
          position="fixed"
          top={0}
          left={0}
          display="flex"
          width="100%"
          height="100%"
          zIndex={zIndex.modal}
          overflow="auto"
        >
          <Box
            component={motion.div}
            ref={composedRefs}
            className={className}
            {...(shouldReduceMotion ? {} : animationConfig)}
            {...contentProps}
          >
            {children}
          </Box>
        </Box>
      </RemoveScroll>
    </FocusTrap>
  );
});
