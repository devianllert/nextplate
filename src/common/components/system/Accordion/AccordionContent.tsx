import * as React from 'react';

import { OverridableComponent } from '@/modules/core/react/types/OverridableComponent';
import { useAccordionItemContext } from './AccordionItemContext';

export interface AccordionContentProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * The content.
   */
  children?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface AccordionContentTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & AccordionContentProps;
  defaultComponent: D;
}

/**
 * `AccordionContent` contains the collapsible content for an `AccordionItem`.
 */
export const AccordionContent: OverridableComponent<AccordionContentTypeMap> = React.forwardRef((props, ref): JSX.Element => {
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
