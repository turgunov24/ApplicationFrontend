import type { IListResponse, IIndexResponse, IGetCountsByStatusResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { referencesLegalFormsUrls } from './urls';

export const REFERENCES_LEGAL_FORMS_BASE_QUERY_KEY = 'references-legal-forms';

export const referencesLegalFormsService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(referencesLegalFormsUrls.index, {
      params,
    });
    return response.data;
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        referencesLegalFormsUrls.countsByStatus
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>(referencesLegalFormsUrls.list);
      return response.data;
    },
  },
};
