import { PermissionActions } from 'src/auth/permissions/types';

import { referencesRolesUrls } from '../services/urls';

export const referencesRolesPermissions = {
  index: {
    resource: referencesRolesUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesRolesUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesRolesUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesRolesUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: referencesRolesUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: referencesRolesUrls.list,
    action: PermissionActions.READ,
  },
};
