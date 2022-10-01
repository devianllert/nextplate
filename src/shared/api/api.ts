import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const AXIOS_INSTANCE = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  baseURL: 'http://localhost:8888/',
  timeout: 1000 * 10,
});

export const api = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
  }).then((response) => response)
    .catch((e) => {
      if (e instanceof AxiosError) {
        throw e.response?.data;
      }

      throw e;
    });

  return promise;
};
