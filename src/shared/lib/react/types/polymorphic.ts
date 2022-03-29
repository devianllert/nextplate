/* eslint-disable @typescript-eslint/ban-types */

/**
 * Remove properties `K` from `T`.
 * Distributive for union types.
 *
 * @internal
 */
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

/**
 * A component whose root component can be controlled via a `component` prop.
 *
 * Adjusts valid props based on the type of `component`.
 */
export interface PolymorphicComponent<Props, DefaultElement extends React.ElementType> {
  <C extends React.ElementType>(
    props: {
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: C;
    } & OverrideProps<Props, C>,
  ): JSX.Element | null;
  <C extends React.ElementType>(props: DefaultComponentProps<Props, DefaultElement, C>): JSX.Element | null;
}

/**
 * Props of the component if `component={Component}` is used.
 */
export type OverrideProps<
  P,
  C extends React.ElementType,
> = (
  & P
  & DistributiveOmit<React.ComponentPropsWithRef<C>, keyof P>
);

/**
 * Props if `component={Component}` is NOT used.
 */
// prettier-ignore
export type DefaultComponentProps<Props, DefaultElement extends React.ElementType, C extends React.ElementType> =
  & Props & {
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component?: C;
  }
  & DistributiveOmit<React.ComponentPropsWithRef<DefaultElement>, keyof Props>;
