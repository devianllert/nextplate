import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export const createContext = <ContextValueType extends object>(rootComponentName: string): [typeof Provider, typeof useContext] => {
  const Context = React.createContext<ContextValueType>(null as any);

  const Provider = (props: ContextValueType & { children: React.ReactNode }): JSX.Element => {
    const { children, ...providerProps } = props;

    // Only re-memoize when prop values change
    const value = React.useMemo(
      () => providerProps,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(providerProps),
    ) as ContextValueType;

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useContext = (consumerName: string): ContextValueType => {
    const context = React.useContext(Context);

    if (context === null) {
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }

    return context;
  };

  Provider.displayName = `${rootComponentName}Provider`;

  return [Provider, useContext];
};
