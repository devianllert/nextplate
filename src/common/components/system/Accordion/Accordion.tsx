import * as React from 'react';

import { useControllableState } from '@/common/hooks/useControllableState';
import { OverridableComponent } from '@/modules/core/react/types/OverridableComponent';

import { AccordionProvider, useAccordionContext } from './AccordionContext';

const ACCORDION_KEYS = ['Home', 'End', 'ArrowDown', 'ArrowUp'];

function isButton(element: HTMLElement): element is HTMLButtonElement {
  return element instanceof HTMLButtonElement;
}

interface AccordionRootProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface AccordionRootTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & AccordionRootProps;
  defaultComponent: D
}

const AccordionRoot: OverridableComponent<AccordionRootTypeMap> = React.forwardRef((props, ref): JSX.Element => {
  const {
    disabled,
    children,
    component: Component = 'div',
    ...other
  } = props;

  const { triggerNodesRef } = useAccordionContext('AccordionItem');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    other.onKeyDown?.(event);

    const target = event.target as HTMLElement;

    const isAccordionKey = ACCORDION_KEYS.includes(event.key);

    if (!isAccordionKey || !isButton(target)) return;

    const triggerNodes = [...triggerNodesRef.current].filter((node) => !node?.disabled);
    const triggerCount = triggerNodes.length;
    const triggerIndex = triggerNodes.indexOf(target);

    if (triggerIndex === -1) return;

    // Prevents page scroll while user is navigating
    event.preventDefault();

    let nextIndex = triggerIndex;
    switch (event.key) {
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = triggerCount - 1;
        break;
      case 'ArrowDown':
        nextIndex = triggerIndex + 1;
        break;
      case 'ArrowUp':
        nextIndex = triggerIndex - 1;
        if (nextIndex < 0) {
          nextIndex = triggerCount - 1;
        }
        break;
      default:
        return;
    }

    const clampedIndex = nextIndex % triggerCount;
    triggerNodes[clampedIndex]?.focus();
  };

  return (
    <Component
      {...other}
      onKeyDown={disabled ? undefined : handleKeyDown}
      ref={ref}
    >
      {children}
    </Component>
  );
});

interface AccordionSingleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Determines whether one or multiple items can be opened at the same time.
   */
  type: 'single';

  /**
   * The controlled stateful value of the accordion item whose content is expanded.
   */
  value?: string;

  /**
   * The value of the item whose content is expanded when the accordion is initially rendered. Use
   * `defaultValue` if you do not need to control the state of an accordion.
   */
  defaultValue?: string;

  /**
   * The callback that fires when the state of the accordion changes.
   */
  onValueChange?(value: string): void;

  /**
   * Whether an accordion item can be collapsed after it has been opened.
   * @default false
   */
  collapsible?: boolean;

  /**
   * Whether or not an accordion is disabled from user interaction.
   *
   * @default false
   */
  disabled?: boolean;
}

interface AccordionMultipleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Determines whether one or multiple items can be opened at the same time.
   */
  type: 'multiple';

  /**
   * The controlled stateful value of the accordion items whose contents are expanded.
   */
  value?: string[];

  /**
   * The value of the items whose contents are expanded when the accordion is initially rendered. Use
   * `defaultValue` if you do not need to control the state of an accordion.
   */
  defaultValue?: string[];

  /**
   * The callback that fires when the state of the accordion changes.
   */
  onValueChange?(value: string[]): void;

  /**
   * Whether or not an accordion is disabled from user interaction.
   *
   * @default false
   */
  disabled?: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface AccordionSingleTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & Omit<AccordionSingleProps, 'type'>;
  defaultComponent: D
}

export const AccordionSingle: OverridableComponent<AccordionSingleTypeMap> = React.forwardRef((props, ref): JSX.Element => {
  const {
    value: valueProp,
    defaultValue,
    onValueChange = () => {},
    collapsible = false,
    disabled,
    children,
    ...accordionSingleProps
  } = props;

  const triggerNodesRef = React.useRef<Set<HTMLButtonElement>>(new Set());

  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  return (
    <AccordionProvider
      value={value ? [value] : []}
      triggerNodesRef={triggerNodesRef}
      onItemOpen={setValue}
      onItemClose={React.useCallback(() => collapsible && setValue(''), [collapsible, setValue])}
      disabled={disabled}
    >
      <AccordionRoot {...accordionSingleProps} ref={ref}>{children}</AccordionRoot>
    </AccordionProvider>
  );
});

// eslint-disable-next-line @typescript-eslint/ban-types
export interface AccordionMultipleTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & Omit<AccordionMultipleProps, 'type'>;
  defaultComponent: D
}

export const AccordionMultiple: OverridableComponent<AccordionMultipleTypeMap> = React.forwardRef((props, ref): JSX.Element => {
  const {
    value: valueProp,
    defaultValue,
    onValueChange = () => {},
    disabled,
    children,
    ...accordionMultipleProps
  } = props;

  const triggerNodesRef = React.useRef<Set<HTMLButtonElement>>(new Set());

  const [value = [], setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  const handleItemOpen = React.useCallback(
    (itemValue: string) => setValue((prevValue = []) => [...prevValue, itemValue]),
    [setValue],
  );

  const handleItemClose = React.useCallback(
    (itemValue: string) => setValue((prevValue = []) => prevValue.filter((val) => val !== itemValue)),
    [setValue],
  );

  return (
    <AccordionProvider
      value={value}
      onItemOpen={handleItemOpen}
      onItemClose={handleItemClose}
      triggerNodesRef={triggerNodesRef}
      disabled={disabled}
    >
      <AccordionRoot {...accordionMultipleProps} ref={ref}>{children}</AccordionRoot>
    </AccordionProvider>
  );
});

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

// eslint-disable-next-line @typescript-eslint/ban-types
export interface AccordionTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & AccordionProps;
  defaultComponent: D
}

/**
 * A vertically stacked set of interactive headings that each reveal an associated section of content.
 */
export const Accordion: OverridableComponent<AccordionTypeMap> = React.forwardRef((props, ref): JSX.Element => {
  const { type, ...accordionProps } = props;

  if (type === 'single') {
    const singleProps = accordionProps as AccordionSingleProps;
    return <AccordionSingle {...singleProps} ref={ref} />;
  }

  if (type === 'multiple') {
    const multipleProps = accordionProps as AccordionMultipleProps;
    return <AccordionMultiple {...multipleProps} ref={ref} />;
  }

  throw new Error('Missing prop `type` expected on `Accordion`');
});

export { Accordion as Root };
