import type { IListResponse, IIndexResponse, IGetCountsByStatusResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { referencesServicesUrls } from './urls';

export const REFERENCES_SERVICES_BASE_QUERY_KEY = 'references-services';

export const referencesServicesService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(referencesServicesUrls.index, {
      params,
    });
    return response.data;
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        referencesServicesUrls.countsByStatus
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>(referencesServicesUrls.list);
      return response.data;
    },
  },
};
