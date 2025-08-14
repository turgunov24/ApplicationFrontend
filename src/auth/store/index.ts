import type { IAuthStore } from './types';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      setUser: (user) => set({ user }),
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: 'auth-store',
    }
  )
);
