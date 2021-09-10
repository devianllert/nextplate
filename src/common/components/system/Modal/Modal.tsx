import * as React from 'react';
import { AnimatePresence, useReducedMotion } from 'framer-motion';

import { useComposedRefs } from '@/modules/core/react/composeRefs';
import { useClickAway } from '@/common/hooks/useClickAway';
import { useKeyboardKey } from '@/common/hooks/useKeyboradKey';

import { Portal } from '../Portal';
import { ModalProvider } from './ModalContext';
import { manager, useModalManager } from './ModalManager';

export interface ModalProps {
  /**
   * The content
   */
  children: React.ReactNode;

  /**
   * If `true`, the component is shown.
   *
   * @default false
   */
  open?: boolean;

  /**
   * Callback fired when the component requests to be closed.
   */
  onClose?: () => void;

  /**
   * When `true`, focus cannot escape the `Content` via keyboard,
   * pointer, or a programmatic focus.
   *
   * @default true
   */
  trapFocus?: boolean;

  /**
   * If `true`, the modal will close when the something outside of modal is clicked
   *
   * @default true
   */
  closeOnOutsideClick?: boolean;

  /**
   * If `true`, the modal will close when the `Esc` key is pressed
   *
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * Callback fired when the click happens outside of modal.
   */
  onOutsideClick?: (event: PointerEvent) => void;

  /**
   * Callback fired when the escape key is pressed
   */
  onEsc?: (event: KeyboardEvent) => void;

  /**
   * If `true`, scrolling will be disabled on the `body` when the modal opens.
   *
   *  @default true
   */
  blockScrollOnMount?: boolean;

  /**
   * Handle zoom/pinch gestures on iOS devices when scroll locking is enabled.
   *
   * @default false
   */
  allowPinchZoom?: boolean;

  /**
   * If `true`, a `padding-right` will be applied to the body element
   * that's equal to the width of the scrollbar.
   *
   * This can help prevent some unpleasant flickering effect
   * and content adjustment when the modal opens
   *
   * @default false
   */
  preserveScrollBarGap?: boolean;
}

/**
 * The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else.
 */
export const Modal = React.forwardRef(
  (props: ModalProps, ref: React.ForwardedRef<HTMLDivElement>): JSX.Element => {
    const {
      children,
      open = false,
      trapFocus = true,
      closeOnOutsideClick = true,
      closeOnEsc = true,
      onClose,
      onEsc,
      onOutsideClick,
      blockScrollOnMount = true,
      allowPinchZoom = false,
      preserveScrollBarGap = false,
    } = props;

    const shouldReduceMotion = useReducedMotion() ?? false;

    const contentRef = React.useRef<HTMLDivElement>(null);
    const composedRefs = useComposedRefs(ref, contentRef);

    useModalManager(contentRef, open);

    const handleOutsideClick = (event: PointerEvent) => {
      if (!manager.isTopModal(contentRef)) return;

      const ctrlLeftClick = event.button === 0 && event.ctrlKey === true;
      const isRightClick = event.button === 2 || ctrlLeftClick;

      // If the event is a right-click, we shouldn't close because
      // it is effectively as if we right-clicked the `Overlay`.
      if (!closeOnOutsideClick || isRightClick) return;

      onOutsideClick?.(event);
      onClose?.();
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (!manager.isTopModal(contentRef) || !closeOnEsc) return;

      onEsc?.(event);
      onClose?.();
    };

    useClickAway(contentRef, handleOutsideClick);
    useKeyboardKey('Escape', handleEsc);

    return (
      <ModalProvider
        open={open}
        trapFocus={trapFocus}
        shouldReduceMotion={shouldReduceMotion}
        contentRef={composedRefs}
        closeOnEsc={closeOnEsc}
        closeOnOutsideClick={closeOnOutsideClick}
        blockScrollOnMount={blockScrollOnMount}
        allowPinchZoom={allowPinchZoom}
        preserveScrollBarGap={preserveScrollBarGap}
      >
        <AnimatePresence>{open && <Portal>{children}</Portal>}</AnimatePresence>
      </ModalProvider>
    );
  },
);
