import type { IForm } from '../form/form';
import type { IIndexResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { referencesUserTranslationsUrls } from './urls';

export const REFERENCES_USER_TRANSLATIONS_BASE_QUERY_KEY = 'references-user-translations';

export const referencesUserTranslationsService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(referencesUserTranslationsUrls.index, {
      params,
    });
    return response.data;
  },
  form: {
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IForm>(referencesUserTranslationsUrls.index, {
        params: { id },
      });
      return response.data;
    },
    create: async (data: IForm) => {
      const response = await axiosInstance.post(referencesUserTranslationsUrls.index, data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put(referencesUserTranslationsUrls.index, data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(referencesUserTranslationsUrls.index, {
        params: { id },
      });
      return response.data;
    },
  },
};
