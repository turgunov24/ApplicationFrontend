import type { IForm } from '../form/form';
import type { IIndexResponse, IGetCountsByStatusResponse, IListResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { referencesPermissionGroupsUrls } from './urls';

export const REFERENCES_PERMISSION_GROUPS_BASE_QUERY_KEY = 'references-permission-groups';

export const referencesPermissionGroupsService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(referencesPermissionGroupsUrls.index, {
      params,
    });
    return response.data;
  },
  form: {
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IForm>(referencesPermissionGroupsUrls.index, {
        params: { id },
      });
      return response.data;
    },
    create: async (data: IForm) => {
      const response = await axiosInstance.post(referencesPermissionGroupsUrls.index, data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put(referencesPermissionGroupsUrls.index, data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(referencesPermissionGroupsUrls.index, {
        params: { id },
      });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        referencesPermissionGroupsUrls.countsByStatus
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>(referencesPermissionGroupsUrls.list);
      return response.data;
    },
  },
};
