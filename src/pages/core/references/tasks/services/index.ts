import type { IForm } from '../form/form';
import type { IListResponse, IIndexResponse, IGetCountsByStatusResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { referencesTasksUrls } from './urls';

export const REFERENCES_TASKS_BASE_QUERY_KEY = 'references-tasks';

export const referencesTasksService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(referencesTasksUrls.index, {
      params,
    });
    return response.data;
  },
  form: {
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IForm>(
        referencesTasksUrls.index,
        {
          params: { id },
        }
      );
      return response.data;
    },
    create: async (data: IForm) => {
      const response = await axiosInstance.post(referencesTasksUrls.index, data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put(referencesTasksUrls.index, data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(referencesTasksUrls.index, {
        params: { id },
      });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        referencesTasksUrls.countsByStatus
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>(referencesTasksUrls.list);
      return response.data;
    },
  },
};
