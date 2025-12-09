import { PermissionActions } from 'src/auth/permissions/types';

import { referencesRegionsUrls } from '../services/urls';

export const referencesRegionsPermissions = {
  index: {
    resource: referencesRegionsUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesRegionsUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesRegionsUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesRegionsUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: referencesRegionsUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: referencesRegionsUrls.list,
    action: PermissionActions.READ,
  },
};
