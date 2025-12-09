import { PermissionActions } from 'src/auth/permissions/types';

import { referencesDistrictsUrls } from '../services/urls';

export const referencesDistrictsPermissions = {
  index: {
    resource: referencesDistrictsUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesDistrictsUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesDistrictsUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesDistrictsUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: referencesDistrictsUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: referencesDistrictsUrls.list,
    action: PermissionActions.READ,
  },
};
