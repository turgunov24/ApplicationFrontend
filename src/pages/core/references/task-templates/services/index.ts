import type { IForm } from '../form/form';
import type { IListResponse, IIndexResponse, IGetCountsByStatusResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { referencesTaskTemplatesUrls } from './urls';

export const REFERENCES_TASK_TEMPLATES_BASE_QUERY_KEY = 'references-task-templates';

export const referencesTaskTemplatesService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(referencesTaskTemplatesUrls.index, {
      params,
    });
    return response.data;
  },
  form: {
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IForm>(
        referencesTaskTemplatesUrls.index,
        {
          params: { id },
        }
      );
      return response.data;
    },
    create: async (data: IForm) => {
      const response = await axiosInstance.post(referencesTaskTemplatesUrls.index, data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put(referencesTaskTemplatesUrls.index, data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(referencesTaskTemplatesUrls.index, {
        params: { id },
      });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        referencesTaskTemplatesUrls.countsByStatus
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>(referencesTaskTemplatesUrls.list);
      return response.data;
    },
  },
};
