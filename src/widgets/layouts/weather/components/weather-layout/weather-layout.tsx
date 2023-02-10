import React from 'react';

export interface WeatherLayoutProps {
  children?: React.ReactNode;
}

/**
 * We create layout for nested theme, cuz we want to use dark theme in all of weather pages
 */
export const WeatherLayout = (props: WeatherLayoutProps): JSX.Element => {
  const { children } = props;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
