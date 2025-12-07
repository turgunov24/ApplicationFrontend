import type { IForm } from '../form/form';
import type {
  IGetResponse,
  IIndexResponse,
  ICreateResponse,
  IGetCountsByStatusResponse,
} from './types';

import axiosInstance from 'src/lib/axios';

import { usersUrls } from './urls';

export const USERS_BASE_QUERY_KEY = 'users';

export const usersService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(usersUrls.index, { params });
    return response.data;
  },
  form: {
    create: async (data: IForm) => {
      const response = await axiosInstance.post<ICreateResponse>(usersUrls.index, data);
      return response;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put<ICreateResponse>(usersUrls.index, data, {
        params: { id },
      });
      return response;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(usersUrls.index, { params: { id } });
      return response.data;
    },
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IGetResponse>(usersUrls.index, { params: { id } });
      return response;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        usersUrls.countsByStatus
      );
      return response.data;
    },
    uploadAvatar: async (id: IIndexResponse['result'][number]['id'], file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axiosInstance.put(usersUrls.uploadAvatar, formData, {
        params: { id },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    },
    getAvatar: async (url: string) => {
      const response = await axiosInstance.get(url, { responseType: 'blob' });
      return response;
    },
  },
};
