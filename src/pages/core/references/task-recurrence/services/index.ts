import type { IForm } from '../form/form';
import type { IListResponse, IIndexResponse, IGetCountsByStatusResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { referencesTaskRecurrenceUrls } from './urls';

export const REFERENCES_TASK_RECURRENCE_BASE_QUERY_KEY = 'references-task-recurrence';

export const referencesTaskRecurrenceService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(referencesTaskRecurrenceUrls.index, {
      params,
    });
    return response.data;
  },
  form: {
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IForm>(referencesTaskRecurrenceUrls.index, {
        params: { id },
      });
      return response.data;
    },
    create: async (data: IForm) => {
      const response = await axiosInstance.post(referencesTaskRecurrenceUrls.index, data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put(referencesTaskRecurrenceUrls.index, data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(referencesTaskRecurrenceUrls.index, {
        params: { id },
      });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        referencesTaskRecurrenceUrls.countsByStatus
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>(referencesTaskRecurrenceUrls.list);
      return response.data;
    },
  },
};
