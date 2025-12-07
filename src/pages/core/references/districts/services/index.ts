import type { IForm } from '../form/form';
import type {
  IGetResponse,
  IListResponse,
  IIndexResponse,
  IGetCountsByStatusResponse,
} from './types';

import axiosInstance from 'src/lib/axios';

import { referencesDistrictsUrls } from './urls';

export const REFERENCES_DISTRICTS_BASE_QUERY_KEY = 'references-districts';

export const referencesDistrictsService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(referencesDistrictsUrls.index, {
      params,
    });
    return response.data;
  },
  form: {
    create: async (data: IForm) => {
      const response = await axiosInstance.post(referencesDistrictsUrls.index, data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put(referencesDistrictsUrls.index, data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(referencesDistrictsUrls.index, {
        params: { id },
      });
      return response.data;
    },
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IGetResponse>(referencesDistrictsUrls.index, {
        params: { id },
      });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        referencesDistrictsUrls.countsByStatus
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>(referencesDistrictsUrls.list);
      return response.data;
    },
  },
};
