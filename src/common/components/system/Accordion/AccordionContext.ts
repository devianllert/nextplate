import { createContext } from '@/modules/core/react/createContext';

const ACCORDION_NAME = 'Accordion';

interface AccordionContextValue {
  value?: string[];
  defaultValue?: string[];
  disabled?: boolean;
  onItemOpen: (value: string) => void;
  onItemClose: (value: string) => void;
  triggerNodesRef: React.MutableRefObject<Set<HTMLButtonElement | null>>;
}

export const [AccordionProvider, useAccordionContext] = createContext<AccordionContextValue>(ACCORDION_NAME);
