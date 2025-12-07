import type { IForm } from '../form/form';
import type {
  IGetResponse,
  IListResponse,
  IIndexResponse,
  IGetCountsByStatusResponse,
} from './types';

import axiosInstance from 'src/lib/axios';

import { referencesRegionsUrls } from './urls';

export const REFERENCES_REGIONS_BASE_QUERY_KEY = 'references-regions';

export const referencesRegionsService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(referencesRegionsUrls.index, {
      params,
    });
    return response.data;
  },
  form: {
    create: async (data: IForm) => {
      const response = await axiosInstance.post(referencesRegionsUrls.index, data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put(referencesRegionsUrls.index, data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(referencesRegionsUrls.index, { params: { id } });
      return response.data;
    },
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IGetResponse>(referencesRegionsUrls.index, {
        params: { id },
      });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        referencesRegionsUrls.countsByStatus
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>(referencesRegionsUrls.list);
      return response.data;
    },
  },
};
