import type { IForm } from '../form/form';
import type {
  IIndexResponse,
  IGetCountsByStatusResponse,
  IGetResponse,
  IListResponse,
} from './types';

import axiosInstance from 'src/lib/axios';

export const REFERENCES_REGIONS_BASE_QUERY_KEY = 'references-regions';

export const referencesRegionsService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>('/references/regions', { params });
    return response.data;
  },
  form: {
    create: async (data: IForm) => {
      const response = await axiosInstance.post('/references/regions', data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put('/references/regions', data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete('/references/regions', { params: { id } });
      return response.data;
    },
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IGetResponse>('/references/regions', {
        params: { id },
      });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        '/references/regions/counts-by-status'
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>('/references/regions/list');
      return response.data;
    },
  },
};
