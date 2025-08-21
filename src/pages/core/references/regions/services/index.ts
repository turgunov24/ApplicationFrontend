import type { IIndexResponse, IGetCountsByStatusResponse } from './types';

import axiosInstance from 'src/lib/axios';

export const REFERENCES_REGIONS_BASE_QUERY_KEY = 'references-regions';

export const referencesRegionsService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>('/references/regions', { params });
    return response.data;
  },
  form: {
    create: async (data: FormData) => {
      const response = await axiosInstance.post('/references/regions', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: FormData) => {
      const response = await axiosInstance.put('references/regions', data, {
        params: { id },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete('/references/regions', { params: { id } });
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
  },
};
