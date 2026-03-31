import type { IIndexResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { referencesTaskActionsHistoryUrls } from './urls';

export const REFERENCES_TASK_ACTIONS_HISTORY_BASE_QUERY_KEY = 'references-task-actions-history';

export const referencesTaskActionsHistoryService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(
      referencesTaskActionsHistoryUrls.index,
      {
        params,
      }
    );
    return response.data;
  },
  changeStatus: async (data: Pick<IIndexResponse['result'][number], 'taskId' | 'type' | 'status'>) => {
    const response = await axiosInstance.post(
      referencesTaskActionsHistoryUrls.changeStatus,
      data
    );
    return response.data;
  },
};
