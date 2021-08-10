export type HistoryOptions = 'replace' | 'push';

export type Serializers<T> = {
  parse: (value: string) => T | null;
  serialize: (value: T) => string;
};

export type QueryTypeMap = {
  string: Serializers<string>;
  integer: Serializers<number>;
  float: Serializers<number>;
  boolean: Serializers<boolean>;
  timestamp: Serializers<Date>;
  isoDateTime: Serializers<Date>;
};

export const queryTypes: QueryTypeMap = {
  string: {
    parse: (v: string): string => v,
    serialize: (v): string => `${v}`,
  },
  integer: {
    parse: (v: string): number => parseInt(v, 10),
    serialize: (v): string => Math.round(v).toFixed(),
  },
  float: {
    parse: (v: string): number => parseFloat(v),
    serialize: (v): string => v.toString(),
  },
  boolean: {
    parse: (v: string): boolean => v === 'true',
    serialize: (v: boolean): string => (v ? 'true' : 'false'),
  },
  timestamp: {
    parse: (v: string): Date => new Date(parseInt(v, 10)),
    serialize: (v: Date): string => v.valueOf().toString(),
  },
  isoDateTime: {
    parse: (v: string): Date => new Date(v),
    serialize: (v: Date): string => v.toISOString(),
  },
};
