import type { IForm } from '../form/form';
import type { IListResponse, IIndexResponse, IGetCountsByStatusResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { referencesRolesUrls } from './urls';

export const REFERENCES_ROLES_BASE_QUERY_KEY = 'references-roles';

export const referencesRolesService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(referencesRolesUrls.index, { params });
    return response.data;
  },
  form: {
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IForm>(referencesRolesUrls.index, {
        params: { id },
      });
      return response.data;
    },
    create: async (data: IForm) => {
      const response = await axiosInstance.post(referencesRolesUrls.index, data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put(referencesRolesUrls.index, data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(referencesRolesUrls.index, { params: { id } });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        referencesRolesUrls.countsByStatus
      );
      return response.data;
    },

    list: async () => {
      const response = await axiosInstance.get<IListResponse>(referencesRolesUrls.list);
      return response.data;
    },
  },
};
