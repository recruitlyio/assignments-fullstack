import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiError } from '../types';

//  TODO change URL
const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
      return Promise.reject({
        status: error.response.status,
        message: error.response.data?.message || 'An error occurred',
        data: error.response.data,
      });
    } else if (error.request) {
      console.error('API Error: No response received');
      return Promise.reject({
        message: 'No response from server',
      });
    } else {
      console.error('API Error:', error.message);
      return Promise.reject({
        message: error.message,
      });
    }
  },
);

const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiService = {
  parseResume: (resumeText: string) =>
    request<{ data: any }>({
      method: 'POST',
      url: '/parse',
      data: { resumeText },
    }),
};
