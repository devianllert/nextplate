import { createContext } from '@/modules/core/react/createContext';

const ACCORDION_ITEM_NAME = 'AccordionItem';

interface AccordionItemContextValue {
  open?: boolean;
  disabled?: boolean;
  onItemToggle: () => void;
  triggerId?: string;
}

export const [AccordionItemProvider, useAccordionItemContext] = createContext<AccordionItemContextValue>(ACCORDION_ITEM_NAME);
