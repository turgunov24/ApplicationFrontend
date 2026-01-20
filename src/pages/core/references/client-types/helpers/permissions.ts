import { PermissionActions } from 'src/auth/permissions/types';

import { referencesClientTypesUrls } from '../services/urls';

export const referencesClientTypesPermissions = {
  index: {
    resource: referencesClientTypesUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesClientTypesUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesClientTypesUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesClientTypesUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: referencesClientTypesUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: referencesClientTypesUrls.list,
    action: PermissionActions.READ,
  },
};
