import type { IListResponse, IIndexResponse, IGetCountsByStatusResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { referencesClientTypesUrls } from './urls';

export const REFERENCES_CLIENT_TYPES_BASE_QUERY_KEY = 'references-client-types';

export const referencesClientTypesService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(referencesClientTypesUrls.index, {
      params,
    });
    return response.data;
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        referencesClientTypesUrls.countsByStatus
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>(referencesClientTypesUrls.list);
      return response.data;
    },
  },
};
