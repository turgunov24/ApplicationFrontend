import type { IForm } from '../form/form';
import type { IListResponse, IIndexResponse, IGetCountsByStatusResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { referencesTaskTemplateCategoriesUrls } from './urls';

export const REFERENCES_TASK_TEMPLATE_CATEGORIES_BASE_QUERY_KEY = 'references-task-template-categories';

export const referencesTaskTemplateCategoriesService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(referencesTaskTemplateCategoriesUrls.index, {
      params,
    });
    return response.data;
  },
  form: {
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IForm>(referencesTaskTemplateCategoriesUrls.index, {
        params: { id },
      });
      return response.data;
    },
    create: async (data: IForm) => {
      const response = await axiosInstance.post(referencesTaskTemplateCategoriesUrls.index, data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put(referencesTaskTemplateCategoriesUrls.index, data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(referencesTaskTemplateCategoriesUrls.index, {
        params: { id },
      });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        referencesTaskTemplateCategoriesUrls.countsByStatus
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>(referencesTaskTemplateCategoriesUrls.list);
      return response.data;
    },
  },
};
