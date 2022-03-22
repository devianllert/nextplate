import { api } from './api';

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
  const response = await api.post<T>(url, {
    query,
    variables,
  },
  {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
