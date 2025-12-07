export enum PermissionActions {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export interface IPermission {
  resource: string;
  action: PermissionActions;
}
