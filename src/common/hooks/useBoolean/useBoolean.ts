import * as React from 'react';

/**
 * Hook that tracks value of a boolean
 */
export const useBoolean = (initialBool = true): [boolean, (bool?: boolean) => void] => {
  const [bool, setBool] = React.useState<boolean>(initialBool);

  const toggle = React.useCallback(
    (nextValue?: boolean): void => {
      if (typeof nextValue === 'boolean') {
        setBool(nextValue);

        return;
      }

      setBool((currentValue): boolean => !currentValue);
    },
    [setBool],
  );

  return [bool, toggle];
};
