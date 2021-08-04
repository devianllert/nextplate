import deepmerge from 'deepmerge';

import { breakpoints, createMediaQuery } from '@/common/design/media';
import { get } from '@/common/utils/get';

export type ResponsiveValue<T> = T | Array<T | null> | { [key: string]: T };

export interface CSSSystemStyleFunctionOptions {
  properties: string[];
  scale: string;
  transform?: typeof get;
  defaultScale: any[];
}

interface CSSSystemStyleFunction {
  (space: any[], value: string | number): Record<string, unknown>;
  scale: string;
  defaults: any[],
}

export interface CSSSystem {
  [key: string]: CSSSystemStyleFunctionOptions;
}

const sort = (obj: Record<string, unknown>) => {
  const next: Record<string, unknown> = {};

  Object.keys(obj)
    .sort((a, b) => a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base',
    }))
    .forEach((key) => {
      next[key] = obj[key];
    });

  return next;
};

export const createStyleFunction = ({
  properties,
  scale: scaleName,
  transform = get,
  defaultScale,
}: CSSSystemStyleFunctionOptions): CSSSystemStyleFunction => {
  const styleFunction: CSSSystemStyleFunction = (scale: any[], value: string | number, _props?) => {
    const result: Record<string, unknown> = {};

    const n = transform(scale, value);

    if (n === null) return undefined;

    properties.forEach((prop) => {
      result[prop] = n;
    });

    return result;
  };

  styleFunction.scale = scaleName;
  styleFunction.defaults = defaultScale;

  return styleFunction;
};

const parseResponsiveArray = (
  mediaQueries: (string | null)[],
  styleFunction: CSSSystemStyleFunction,
  scale: any[],
  input: any[],
) => {
  const styles: Record<string, Record<string, unknown>> = {};

  input.slice(0, mediaQueries.length).forEach((value, i) => {
    const media = mediaQueries[i];
    const style = styleFunction(scale, value);

    if (!media) {
      Object.assign(styles, style);
    } else {
      Object.assign(styles, {
        [media]: { ...styles[media], ...style },
      });
    }
  });

  return styles;
};

const parseResponsiveObject = (
  mediaBreakpoints: Record<string, unknown>,
  styleFunction: CSSSystemStyleFunction,
  scale: any,
  input: any,
) => {
  const styles: Record<string, Record<string, unknown>> = {};

  Object.keys(input).forEach((key) => {
    const breakpoint = mediaBreakpoints[key];
    const value = input[key];
    const style = styleFunction(scale, value);

    if (!breakpoint) {
      Object.assign(styles, style);
    } else {
      const media = `@media screen and (min-width: ${breakpoint}px)`;
      Object.assign(styles, {
        [media]: { ...styles[media], ...style },
      });
    }
  });

  return styles;
};

const createParser = (config: Record<string, CSSSystemStyleFunction>) => {
  const parse = (props: Record<string, any>) => {
    let styles: Record<string, unknown> = {};
    let shouldSort = false;

    const media = [
      null,
      ...Object.keys(breakpoints).map(
        (key) => `@media screen and (min-width: ${breakpoints[key]}px)`,
      ),
    ];

    Object.keys(props).forEach((key) => {
      if (!config[key]) return;

      const styleFunction = config[key];
      const input = props[key];
      const scale = (get(props.theme, styleFunction.scale) as any[]) ?? styleFunction.defaults;

      if (typeof input === 'object') {
        if (Array.isArray(input)) {
          styles = deepmerge(
            styles,
            parseResponsiveArray(media, styleFunction, scale, input),
          );

          return;
        }

        if (input !== null) {
          styles = deepmerge(
            styles,
            parseResponsiveObject(breakpoints, styleFunction, scale, input),
          );

          shouldSort = true;

          return;
        }
      }

      Object.assign(styles, styleFunction(scale, input));
    });

    // sort object-based responsive styles
    if (shouldSort) {
      styles = sort(styles);
    }

    return styles;
  };

  return parse;
};

export const createSystem = (system: CSSSystem) => {
  const config: Record<string, CSSSystemStyleFunction> = {};

  Object.keys(system).forEach((key) => {
    config[key] = createStyleFunction(system[key]);
  });

  const parser = createParser(config);

  return parser;
};
