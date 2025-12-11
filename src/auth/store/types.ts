import type { IPermission } from '../permissions/types';

interface IUser {
  fullName: string;
  email: string;
  username: string;
}

export interface IAuthStore {
  user: IUser | null;
  accessToken: string | null;
  permissions: Array<IPermission>;

  setUser: (user: IUser | null) => void;
  setAccessToken: (accessToken: string | null) => void;
  setPermissions: (permissions: Array<IPermission>) => void;
}
