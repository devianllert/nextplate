import * as React from 'react';

import { useComposedRefs } from '@/modules/core/react/composeRefs';
import { PolymorphicComponent } from '@/modules/core/react/types/Polymorphic';

import { useAccordionContext } from './AccordionContext';
import { useAccordionItemContext } from './AccordionItemContext';

export interface AccordionTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * The content.
   */
  children?: React.ReactNode;
}

/**
 * `AccordionTrigger` is the trigger that toggles the collapsed state of an `AccordionItem`. It
 * should always be nested inside of an `AccordionHeader`.
 */
export const AccordionTrigger: PolymorphicComponent<AccordionTriggerProps, 'button'> = React.forwardRef((props, ref): JSX.Element => {
  const {
    children,
    component: Component = 'button',
    ...other
  } = props;

  const { triggerNodesRef } = useAccordionContext('AccordionTrigger');
  const accordionItemContext = useAccordionItemContext('AccordionTrigger');

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const composedRefs = useComposedRefs(ref, triggerRef);

  React.useEffect(() => {
    const triggerNodes = triggerNodesRef.current;
    const triggerNode = triggerRef.current;

    if (triggerNode) {
      triggerNodes.add(triggerNode);
      return () => {
        triggerNodes.delete(triggerNode);
      };
    }

    return undefined;
  }, [triggerNodesRef]);

  const onTrigger = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(event);

    accordionItemContext.onItemToggle();
  };

  return (
    <Component
      aria-expanded={accordionItemContext.open || false}
      data-state={accordionItemContext.open ? 'opened' : 'closed'}
      data-disabled={accordionItemContext.disabled ? '' : undefined}
      disabled={accordionItemContext.disabled}
      id={accordionItemContext.triggerId}
      ref={composedRefs}
      {...other}
      onClick={onTrigger}
    >
      {children}
    </Component>
  );
});

export { AccordionTrigger as Trigger };
