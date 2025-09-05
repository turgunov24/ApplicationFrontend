import type { IForm } from '../form/form'
import type { IGetResponse, IListResponse, IIndexResponse, IGetCountsByStatusResponse } from './types'

import axiosInstance from 'src/lib/axios'

export const REFERENCES_DISTRICTS_BASE_QUERY_KEY = 'references-districts';

export const referencesDistrictsService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>('/references/districts', { params });
    return response.data;
  },
  form: {
    create: async (data: IForm) => {
      const response = await axiosInstance.post('/references/districts', data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put('references/districts', data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete('/references/districts', { params: { id } });
      return response.data;
    },
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IGetResponse>('/references/districts', {
        params: { id },
      });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        '/references/districts/counts-by-status'
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>('/references/districts/list');
      return response.data;
    },
  },
};
