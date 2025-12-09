import { PermissionActions } from 'src/auth/permissions/types';

import { referencesPermissionGroupsUrls } from '../services/urls';

export const referencesPermissionGroupsPermissions = {
  index: {
    resource: referencesPermissionGroupsUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesPermissionGroupsUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesPermissionGroupsUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesPermissionGroupsUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: referencesPermissionGroupsUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: referencesPermissionGroupsUrls.list,
    action: PermissionActions.READ,
  },
};
