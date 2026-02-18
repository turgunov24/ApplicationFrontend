import type { AxiosRequestConfig } from 'axios';

import axios, { AxiosError, HttpStatusCode } from 'axios';

import { CONFIG } from 'src/global-config';

import { toast } from 'src/components/snackbar';

import { useAuthStore } from 'src/auth/store';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: CONFIG.serverUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError) {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          if (error.response) {
            const { data } = error.response as { data: { errors: Array<{ message: string }> } };

            if (data) {
              const { errors } = data;
              if (errors) {
                errors.forEach((e) => {
                  toast.error(e.message);
                });
              }
            }
          }

          useAuthStore.setState({ accessToken: null, user: null });
          // /login
          break;
        case HttpStatusCode.BadRequest:
          if (error.response) {
            const { data } = error.response as { data: { errors: Array<{ message: string }> } };

            if (data) {
              const { errors } = data;
              if (errors) {
                errors.forEach((e) => {
                  toast.error(e.message);
                });
              }
            }
          }
          break;
        case HttpStatusCode.NotFound:
          toast.error('Not Found');
          break;
        case HttpStatusCode.InternalServerError:
          toast.error('Internal Server Error');
          break;
        case HttpStatusCode.Forbidden:
          toast.error('Forbidden');
          break;
        default:
          toast.error('Axios Error');
          break;
      }
    }

    return Promise.reject(new Error('Something went wrong!'));
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async <T = unknown>(
  args: string | [string, AxiosRequestConfig]
): Promise<T> => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args, {}];

    const res = await axiosInstance.get<T>(url, config);

    return res.data;
  } catch (error) {
    console.error('Fetcher failed:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/auth/me',
    login: 'api/principals/auth/login',
    register: '/auth/register',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
} as const;
