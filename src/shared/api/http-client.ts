import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const AXIOS_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  timeout: 1000 * 10,
});

export const httpClient = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const controller = new AbortController();

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    signal: controller.signal,
  }).then((response) => response)
    .catch((e) => {
      if (e instanceof AxiosError) {
        throw e.response?.data;
      }

      throw e;
    });

  // @ts-ignore
  promise.cancel = () => {
    controller.abort('Query was cancelled');
  };

  return promise;
};
