import * as React from 'react';

import { OverridableComponent } from '@/modules/core/react/types/OverridableComponent';

import { useAccordionItemContext } from './AccordionItemContext';

export interface AccordionHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * The content.
   */
  children?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface AccordionHeaderTypeMap<P = {}, D extends React.ElementType = 'h3'> {
  props: P & AccordionHeaderProps;
  defaultComponent: D;
}

/**
 * `AccordionHeader` contains the content for the parts of an `AccordionItem` that will be visible
 * whether or not its content is collapsed.
 */
export const AccordionHeader: OverridableComponent<AccordionHeaderTypeMap> = React.forwardRef((props, ref): JSX.Element => {
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
