import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';

const AXIOS_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  timeout: 1000 * 10,
});

export const httpClient = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  const controller = new AbortController();

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    signal: controller.signal,
  }).catch((e) => {
    if (isAxiosError(e)) {
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

export default httpClient;

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;

// In case you want to wrap the body type (optional)
// (if the custom instance is processing data before sending it, like changing the case for example)
export type BodyType<BodyData> = BodyData;
