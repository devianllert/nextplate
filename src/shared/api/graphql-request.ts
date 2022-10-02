import { httpClient } from './http-client';

export interface GraphQLResponse<T = unknown> {
  data?: T;
  errors?: GraphQLError[];
  extensions?: any;
  status: number;
  [key: string]: any;
}

export interface GraphQLError {
  message: string;
  locations: { line: number; column: number }[];
  path: string[];
}

export type Variables = Record<string, unknown>;

export const graphqlRequest = async <T = any, V = Variables>(url: string, query: string, variables?: V): Promise<T> => {
  const response = await httpClient<T>({
    url,
    data: {
      query,
      variables,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
