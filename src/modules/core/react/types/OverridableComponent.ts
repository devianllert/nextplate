/* eslint-disable @typescript-eslint/ban-types */
import { ElementType, ComponentPropsWithRef } from 'react';

export type OverrideProps<C extends ElementType, P = {}> = P & Omit<ComponentPropsWithRef<C>, keyof P>;

export interface OverridableComponent<P = {}> {
  <C extends ElementType>(
    props: {
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component?: C;
    } & OverrideProps<C, P>,
  ): JSX.Element;
}
