import * as React from 'react';

export const createContext = <ContextValueType extends object | null>(
  rootComponentName: string,
  defaultContext?: ContextValueType,
) => {
  const Context = React.createContext<ContextValueType | undefined>(defaultContext);

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

    if (context) return context;
    if (defaultContext !== undefined) return defaultContext;

    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  };

  Provider.displayName = `${rootComponentName}Provider`;

  return [Provider, useContext] as const;
};
