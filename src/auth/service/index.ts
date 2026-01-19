import type { ILoginPayload, ILoginResponse, IGetUserPermissionsResponse } from './types';

import axiosInstance, { endpoints } from 'src/lib/axios';

export const authService = {
  login: async (payload: ILoginPayload) => {
    const response = await axiosInstance.post<ILoginResponse>(endpoints.auth.login, payload);
    return response.data;
  },
  getUserPermissions: async () => {
    const response = await axiosInstance.get<IGetUserPermissionsResponse>(
      endpoints.auth.getUserPermissions
    );
    return response.data;
  },
};
