import * as React from 'react';

import { PolymorphicComponent } from '@/modules/core/react/types/Polymorphic';

import { useAccordionItemContext } from './AccordionItemContext';

export interface AccordionContentProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * The content.
   */
  children?: React.ReactNode;
}

/**
 * `AccordionContent` contains the collapsible content for an `AccordionItem`.
 */
export const AccordionContent: PolymorphicComponent<AccordionContentProps, 'div'> = React.forwardRef((props, ref) => {
  const {
    children,
    component: Component = 'div',
    ...other
  } = props;

  const accordionItemContext = useAccordionItemContext('AccordionContent');

  return (
    <Component
      role="region"
      data-state={accordionItemContext.open ? 'opened' : 'closed'}
      data-disabled={accordionItemContext.disabled ? '' : undefined}
      ref={ref}
      aria-labelledby={accordionItemContext.triggerId}
      {...other}
    >
      {children}
    </Component>
  );
});

export { AccordionContent as Content };
