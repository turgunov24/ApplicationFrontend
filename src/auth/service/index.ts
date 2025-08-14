import type { ILoginPayload, ILoginResponse } from './types'

import axiosInstance, { endpoints } from 'src/lib/axios'

export const authService = {
  login: async (payload: ILoginPayload) => {
    const response = await axiosInstance.post<ILoginResponse>(endpoints.auth.login, payload);
    return response.data;
  },
};
