import type { IForm } from '../form/form';
import type { IGetResponse, IIndexResponse, IGetCountsByStatusResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { referencesPermissionsUrls } from './urls';

export const REFERENCES_PERMISSIONS_BASE_QUERY_KEY = 'references-permissions';

export const referencesPermissionsService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(referencesPermissionsUrls.index, {
      params,
    });
    return response.data;
  },
  form: {
    create: async (data: IForm) => {
      const response = await axiosInstance.post(referencesPermissionsUrls.index, data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put(referencesPermissionsUrls.index, data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(referencesPermissionsUrls.index, {
        params: { id },
      });
      return response.data;
    },
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IGetResponse>(referencesPermissionsUrls.index, {
        params: { id },
      });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        referencesPermissionsUrls.countsByStatus
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<
        Array<{ id: number; nameUz: string; nameRu: string }>
      >(referencesPermissionsUrls.list);
      return response.data;
    },
  },
};
