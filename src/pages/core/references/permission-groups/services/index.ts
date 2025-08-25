import type { IForm } from '../form/form';
import type { IIndexResponse, IGetCountsByStatusResponse } from './types';

import axiosInstance from 'src/lib/axios';

export const REFERENCES_PERMISSION_GROUPS_BASE_QUERY_KEY = 'references-permission-groups';

export const referencesPermissionGroupsService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>('/references/permission-groups', { params });
    return response.data;
  },
  form: {
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IForm>('references/permission-groups', {
        params: { id },
      });
      return response.data;
    },
    create: async (data: IForm) => {
      const response = await axiosInstance.post('/references/permission-groups', data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put('/references/permission-groups', data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete('/references/permission-groups', { params: { id } });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        '/references/permission-groups/counts-by-status'
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<
        Array<{ id: number; nameUz: string; nameRu: string }>
      >('/references/permission-groups/list');
      return response.data;
    },
  },
};
