import type { IForm } from '../form/form';
import type {
  IGetResponse,
  IListResponse,
  IIndexResponse,
  ICreateResponse,
  IGetCountsByStatusResponse,
} from './types';

import axiosInstance from 'src/lib/axios';

import { principalCustomersUrls } from './urls';

export const PRINCIPAL_CUSTOMERS_BASE_QUERY_KEY = 'principalCustomers';

export const principalCustomersService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(principalCustomersUrls.index, {
      params,
    });
    return response.data;
  },
  form: {
    create: async (data: IForm) => {
      const response = await axiosInstance.post<ICreateResponse>(
        principalCustomersUrls.index,
        data
      );
      return response;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put<ICreateResponse>(
        principalCustomersUrls.index,
        data,
        {
          params: { id },
        }
      );
      return response;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(principalCustomersUrls.index, {
        params: { id },
      });
      return response.data;
    },
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IGetResponse>(principalCustomersUrls.index, {
        params: { id },
      });
      return response;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        principalCustomersUrls.countsByStatus
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>(principalCustomersUrls.list);
      return response.data;
    },
  },
};
