import type { IPermission } from '../permissions/types';

export interface ILoginPayload {
  username: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  principal: any;
}

export interface IGetUserPermissionsResponse {
  permissions: Array<IPermission>;
}
