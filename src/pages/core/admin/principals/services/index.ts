import type { IForm } from '../form/form';
import type {
  IGetResponse,
  IListResponse,
  IIndexResponse,
  ICreateResponse,
  IGetCountsByStatusResponse,
} from './types';

import axiosInstance from 'src/lib/axios';

import { principalsUrls } from './urls';

export const PRINCIPALS_BASE_QUERY_KEY = 'principals';

export const principalsService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(principalsUrls.index, { params });
    return response.data;
  },
  form: {
    create: async (data: IForm) => {
      const response = await axiosInstance.post<ICreateResponse>(principalsUrls.index, data);
      return response;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put<ICreateResponse>(principalsUrls.index, data, {
        params: { id },
      });
      return response;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(principalsUrls.index, { params: { id } });
      return response.data;
    },
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IGetResponse>(principalsUrls.index, {
        params: { id },
      });
      return response;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        principalsUrls.countsByStatus
      );
      return response.data;
    },
    uploadAvatar: async (id: IIndexResponse['result'][number]['id'], file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axiosInstance.put(principalsUrls.uploadAvatar, formData, {
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
    list: async () => {
      const response = await axiosInstance.get<IListResponse>(principalsUrls.list);
      return response.data;
    },
  },
};
