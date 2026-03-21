import type { IForm } from '../form/form';
import type { IListResponse, IIndexResponse, IGetCountsByStatusResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { attachTariffToPrincipalCustomersUrls } from './urls';

export const ATTACH_TARIFF_TO_PRINCIPAL_CUSTOMERS_BASE_QUERY_KEY = 'attach-tariff-to-principal-customers';

export const attachTariffToPrincipalCustomersService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(attachTariffToPrincipalCustomersUrls.index, {
      params,
    });
    return response.data;
  },
  form: {
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IForm>(attachTariffToPrincipalCustomersUrls.index, {
        params: { id },
      });
      return response.data;
    },
    create: async (data: IForm) => {
      const response = await axiosInstance.post(attachTariffToPrincipalCustomersUrls.index, data);
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(attachTariffToPrincipalCustomersUrls.index, {
        params: { id },
      });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        attachTariffToPrincipalCustomersUrls.countsByStatus
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>(attachTariffToPrincipalCustomersUrls.list);
      return response.data;
    },
  },
};
