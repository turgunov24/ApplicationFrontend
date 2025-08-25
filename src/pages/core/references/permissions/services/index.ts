import type { IForm } from '../form/form';
import type { IIndexResponse, IGetCountsByStatusResponse, IGetResponse } from './types';

import axiosInstance from 'src/lib/axios';

export const REFERENCES_PERMISSIONS_BASE_QUERY_KEY = 'references-permissions';

export const referencesPermissionsService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>('/references/permissions', { params });
    return response.data;
  },
  form: {
    create: async (data: IForm) => {
      const response = await axiosInstance.post('/references/permissions', data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put('/references/permissions', data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete('/references/permissions', { params: { id } });
      return response.data;
    },
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IGetResponse>('/references/permissions', {
        params: { id },
      });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        '/references/permissions/counts-by-status'
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<
        Array<{ id: number; nameUz: string; nameRu: string }>
      >('/references/permissions/list');
      return response.data;
    },
  },
};
