import type { IForm } from '../form/form';
import type { IIndexResponse, IGetCountsByStatusResponse, IListResponse } from './types';

import axiosInstance from 'src/lib/axios';

export const REFERENCES_COUNTRIES_BASE_QUERY_KEY = 'references-countries';

export const referencesCountriesService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>('/references/countries', { params });
    return response.data;
  },
  form: {
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IForm>('references/countries', {
        params: { id },
      });
      return response.data;
    },
    create: async (data: IForm) => {
      const response = await axiosInstance.post('/references/countries', data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put('/references/countries', data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete('/references/countries', { params: { id } });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        '/references/countries/counts-by-status'
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>('/references/countries/list');
      return response.data;
    },
  },
};
