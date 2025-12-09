import { PermissionActions } from 'src/auth/permissions/types';

import { referencesPermissionsUrls } from '../services/urls';

export const referencesPermissionsPermissions = {
  index: {
    resource: referencesPermissionsUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesPermissionsUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesPermissionsUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesPermissionsUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: referencesPermissionsUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: referencesPermissionsUrls.list,
    action: PermissionActions.READ,
  },
};
