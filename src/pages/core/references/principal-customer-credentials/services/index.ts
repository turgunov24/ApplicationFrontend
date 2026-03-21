import type { IForm } from '../form/form';
import type { IListResponse, IIndexResponse, IGetCountsByStatusResponse } from './types';

import axiosInstance from 'src/lib/axios';

import { referencesPrincipalCustomerCredentialsUrls } from './urls';

export const REFERENCES_PRINCIPAL_CUSTOMER_CREDENTIALS_BASE_QUERY_KEY = 'references-principal-customer-credentials';

export const referencesPrincipalCustomerCredentialsService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>(referencesPrincipalCustomerCredentialsUrls.index, {
      params,
    });
    return response.data;
  },
  form: {
    get: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.get<IForm>(referencesPrincipalCustomerCredentialsUrls.index, {
        params: { id },
      });
      return response.data;
    },
    create: async (data: IForm) => {
      const response = await axiosInstance.post(referencesPrincipalCustomerCredentialsUrls.index, data);
      return response.data;
    },
    update: async (id: IIndexResponse['result'][number]['id'], data: IForm) => {
      const response = await axiosInstance.put(referencesPrincipalCustomerCredentialsUrls.index, data, {
        params: { id },
      });
      return response.data;
    },
    delete: async (id: IIndexResponse['result'][number]['id']) => {
      const response = await axiosInstance.delete(referencesPrincipalCustomerCredentialsUrls.index, {
        params: { id },
      });
      return response.data;
    },
  },
  helpers: {
    getCountsByStatus: async () => {
      const response = await axiosInstance.get<IGetCountsByStatusResponse>(
        referencesPrincipalCustomerCredentialsUrls.countsByStatus
      );
      return response.data;
    },
    list: async () => {
      const response = await axiosInstance.get<IListResponse>(referencesPrincipalCustomerCredentialsUrls.list);
      return response.data;
    },
  },
};
