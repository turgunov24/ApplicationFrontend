import type { IForm } from '../form/form';
import type { IListResponse, IIndexResponse, IGetCountsByStatusResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { referencesTariffsUrls } from './urls';

export const REFERENCES_TARIFFS_BASE_QUERY_KEY = 'references-tariffs';

export const referencesTariffsService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(referencesTariffsUrls.index, {
      params,
    });
    return response.data;
  },
  form: {
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IForm & { currencyId: number }>(
        referencesTariffsUrls.index,
        {
          params: { id },
        }
      );
      return response.data;
    },
    create: async (data: {
      nameUz: string;
      nameRu: string;
      monthlyPrice: number;
      currencyId: number;
    }) => {
      const response = await axiosInstance.post(referencesTariffsUrls.index, data);
      return response.data;
    },
    update: async (
      id: IIndexResponse['result'][number]['id'],
      data: { nameUz: string; nameRu: string; monthlyPrice: number; currencyId: number }
    ) => {
      const response = await axiosInstance.put(referencesTariffsUrls.index, data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(referencesTariffsUrls.index, {
        params: { id },
      });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        referencesTariffsUrls.countsByStatus
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>(referencesTariffsUrls.list);
      return response.data;
    },
  },
};
