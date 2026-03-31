import type { IIndexResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { referencesTasksCommentsUrls } from './urls';

export const REFERENCES_TASKS_COMMENTS_BASE_QUERY_KEY = 'references-tasks-comments';

export const referencesTasksCommentsService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(referencesTasksCommentsUrls.index, {
      params,
    });
    return response.data;
  },
  form: {
    create: async (data: Pick<IIndexResponse['result'][number], 'text' | 'taskId'>) => {
      const response = await axiosInstance.post(referencesTasksCommentsUrls.index, data);
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(referencesTasksCommentsUrls.index, {
        params: { id },
      });
      return response.data;
    },
  },
};
