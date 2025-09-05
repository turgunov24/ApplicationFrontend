import type { IForm } from '../form/form';
import type { IIndexResponse, IGetCountsByStatusResponse, IListResponse } from './types';

import axiosInstance from 'src/lib/axios';

export const REFERENCES_ROLES_BASE_QUERY_KEY = 'references-roles';

export const referencesRolesService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>('/references/roles', { params });
    return response.data;
  },
  form: {
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IForm>('references/roles', {
        params: { id },
      });
      return response.data;
    },
    create: async (data: IForm) => {
      const response = await axiosInstance.post('/references/roles', data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put('/references/roles', data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete('/references/roles', { params: { id } });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        '/references/roles/counts-by-status'
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>('/references/roles/list');
      return response.data;
    },
  },
};
