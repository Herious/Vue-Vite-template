import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';


interface IResponse {
  code: number,
  message: string
  data?: any
}

const baseURL: string = 'http://172.18.228.125:3000';

const api = axios.create({
  baseURL,
  timeout: 8000
});

api.interceptors.request.use((req: AxiosRequestConfig) => {
  const authorization: string = localStorage.getItem("token") as string;
  req.headers.Authorization = authorization;
  return req;
})

api.interceptors.response.use((res: AxiosResponse) => {
  const response: IResponse = res.data;
  if (0 !== response.code) {
    console.warn(response.message)
  }
  return res
}, error => {
  console.log(error);
})

export default api;