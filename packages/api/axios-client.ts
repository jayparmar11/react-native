import axios, { AxiosRequestConfig } from 'axios'

export const AXIOS_INSTANCE = axios.create({
  baseURL: 'https://tamagui-plus-react-native-reusables-server.vercel.app/',
})

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(({ data }) => data)

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled by React Query')
  }

  return promise
}
