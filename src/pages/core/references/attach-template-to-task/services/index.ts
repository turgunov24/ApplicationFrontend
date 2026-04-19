import type { IForm } from '../form/form';
import type { IListResponse, IIndexResponse, IGetCountsByStatusResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { attachTemplateToTaskUrls } from './urls';

export const ATTACH_TEMPLATE_TO_TASK_BASE_QUERY_KEY = 'attach-template-to-task';

export const attachTemplateToTaskService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(attachTemplateToTaskUrls.index, {
      params,
    });
    return response.data;
  },
  form: {
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IForm>(attachTemplateToTaskUrls.index, {
        params: { id },
      });
      return response.data;
    },
    create: async (data: IForm) => {
      const response = await axiosInstance.post(attachTemplateToTaskUrls.index, data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put(attachTemplateToTaskUrls.index, data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(attachTemplateToTaskUrls.index, {
        params: { id },
      });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        attachTemplateToTaskUrls.countsByStatus
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>(attachTemplateToTaskUrls.list);
      return response.data;
    },
  },
};
