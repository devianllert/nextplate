import * as React from 'react';

import { PolymorphicComponent } from '@/modules/core/react/types/Polymorphic';

import { useAccordionItemContext } from './AccordionItemContext';

export interface AccordionHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * The content.
   */
  children?: React.ReactNode;
}

/**
 * `AccordionHeader` contains the content for the parts of an `AccordionItem` that will be visible
 * whether or not its content is collapsed.
 */
export const AccordionHeader: PolymorphicComponent<AccordionHeaderProps, 'h3'> = React.forwardRef((props, ref) => {
  const {
    children,
    component: Component = 'h3',
    ...other
  } = props;

  const accordionItemContext = useAccordionItemContext('AccordionItem');

  return (
    <Component
      ref={ref}
      data-state={accordionItemContext.open ? 'opened' : 'closed'}
      data-disabled={accordionItemContext.disabled ? '' : undefined}
      {...other}
    >
      {children}
    </Component>
  );
});

export { AccordionHeader as Header };
