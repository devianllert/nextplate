import { breakpointsArray as breakpoints } from '../media';

interface ResponsivePropertyOptions {
  property: string;
  values: (number | string | null)[];
  unit?: string;
}

export function responsiveProperty(options: ResponsivePropertyOptions) {
  const { property, values } = options;

  const output: Record<string, Record<string, string> | string> = {
    [property]: `${values[0]}`,
  };

  values.slice(1).forEach((value, index) => {
    if (value === null) return;

    output[`@media (min-width:${breakpoints[index]}px)`] = {
      [property]: `${value}`,
    };
  });

  return output;
}
