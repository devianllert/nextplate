import { CSSObject } from '@emotion/react';
import deepmerge from 'deepmerge';

import { breakpoints, createMediaQuery } from '@/common/design/media';
import { get } from '@/common/utils/get';

export type ResponsiveValue<T> = T | Array<T | null> | { [key: string]: T };

export type ScaleValue = number[] | string[];
export interface CSSSystemStyleFunctionOptions {
  properties: string[];
  scale: string;
  transform?: (scale: ScaleValue, n: number | string) => unknown;
  defaultScale?: ScaleValue;
}

interface CSSSystemStyleFunction {
  (space: ScaleValue, value: string | number): Record<string, unknown> | undefined;
  scale: string;
  defaults?: ScaleValue,
}

export interface CSSSystem {
  [key: string]: CSSSystemStyleFunctionOptions | boolean;
}

const getValue = (scale: ScaleValue, n: number | string) => get(scale, n) ?? n;

const sort = (obj: Record<string, CSSObject>) => {
  const next: Record<string, CSSObject> = {};

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
  transform = getValue,
  defaultScale,
}: CSSSystemStyleFunctionOptions): CSSSystemStyleFunction => {
  const styleFunction: CSSSystemStyleFunction = (scale: ScaleValue, value: string | number) => {
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
  scale: ScaleValue,
  input: ScaleValue,
) => {
  const styles: Record<string, Record<string, CSSObject>> = {};

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
  mediaBreakpoints: Record<string, number>,
  styleFunction: CSSSystemStyleFunction,
  scale: ScaleValue,
  input: Record<string, string>,
) => {
  const styles: Record<string, Record<string, CSSObject>> = {};

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

export interface CSSSystemParser {
  (props: Record<string, any>): Record<string, CSSObject>;
  config: Record<string, CSSSystemStyleFunction>;
  propNames: string[];
}

const createParser = (config: Record<string, CSSSystemStyleFunction>): CSSSystemParser => {
  const parse: CSSSystemParser = (props) => {
    let styles: Record<string, CSSObject> = {};
    let shouldSort = false;

    const media = [
      null,
      ...Object.keys(breakpoints).map(
        (key) => createMediaQuery(breakpoints[key]).up,
      ),
    ];

    Object.keys(props).forEach((key) => {
      if (!config[key]) return;

      const styleFunction = config[key];
      const input = props[key];
      const scale = (get(props.theme, styleFunction.scale) as ScaleValue) ?? styleFunction.defaults;

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

  parse.config = config;
  parse.propNames = Object.keys(config);

  return parse;
};

export const createSystem = (system: CSSSystem): CSSSystemParser => {
  const config: Record<string, CSSSystemStyleFunction> = {};

  Object.keys(system).forEach((key) => {
    const systemConfig = system[key];
    // shortcut definition
    if (typeof systemConfig === 'boolean') {
      if (systemConfig === false) return;

      config[key] = createStyleFunction({
        properties: [key],
        scale: key,
      });

      return;
    }

    config[key] = createStyleFunction(systemConfig);
  });

  const parser = createParser(config);

  return parser;
};

export const compose = (...parsers: CSSSystemParser[]): CSSSystemParser => {
  const config = {};

  parsers.forEach((parser) => {
    if (!parser || !parser.config) return;

    Object.assign(config, parser.config);
  });

  const parser = createParser(config);

  return parser;
};
