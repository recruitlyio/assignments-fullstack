import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export async function axiosRequest<T = any>(config: AxiosRequestConfig): Promise<T> {
  const response: AxiosResponse<T> = await axiosInstance.request<T>(config);
  return response.data;
}

export default axiosInstance;
