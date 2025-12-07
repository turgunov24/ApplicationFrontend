import type { IPermission } from '../permissions/types'

export interface IAuthStore {
  user: any;
  accessToken: string | null;
  permissions: Array<IPermission>;

  setUser: (user: any) => void;
  setAccessToken: (accessToken: string | null) => void;
  setPermissions: (permissions: Array<IPermission>) => void;
}
