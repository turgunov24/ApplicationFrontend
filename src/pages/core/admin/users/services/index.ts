import type { IIndexResponse } from './types';

import axiosInstance from 'src/lib/axios';

export const USERS_BASE_QUERY_KEY = 'users';

export const usersService = {
  index: async (params: any) => {
    const response = await axiosInstance.get<IIndexResponse>('/users', { params });
    return response.data;
  },
};
