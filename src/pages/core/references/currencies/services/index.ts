import type { IForm } from '../form/form';
import type { IListResponse, IIndexResponse, IGetCountsByStatusResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { referencesCurrenciesUrls } from './urls';

export const REFERENCES_CURRENCIES_BASE_QUERY_KEY = 'references-currencies';

export const referencesCurrenciesService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(referencesCurrenciesUrls.index, {
      params,
    });
    return response.data;
  },
  form: {
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IForm>(referencesCurrenciesUrls.index, {
        params: { id },
      });
      return response.data;
    },
    create: async (data: IForm) => {
      const response = await axiosInstance.post(referencesCurrenciesUrls.index, data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put(referencesCurrenciesUrls.index, data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(referencesCurrenciesUrls.index, {
        params: { id },
      });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        referencesCurrenciesUrls.countsByStatus
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>(referencesCurrenciesUrls.list);
      return response.data;
    },
  },
};
