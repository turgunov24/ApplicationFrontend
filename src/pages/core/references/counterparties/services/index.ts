import type { IListResponse, IIndexResponse, IGetCountsByStatusResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { referencesCounterpartiesUrls } from './urls';

export const REFERENCES_COUNTERPARTIES_BASE_QUERY_KEY = 'references-counterparties';

export const referencesCounterpartiesService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(referencesCounterpartiesUrls.index, {
      params,
    });
    return response.data;
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        referencesCounterpartiesUrls.countsByStatus
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>(referencesCounterpartiesUrls.list);
      return response.data;
    },
  },
};
