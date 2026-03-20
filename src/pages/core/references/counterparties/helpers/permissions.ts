import { PermissionActions } from 'src/auth/permissions/types';

import { referencesCounterpartiesUrls } from '../services/urls';

export const referencesCounterpartiesPermissions = {
  index: {
    resource: referencesCounterpartiesUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesCounterpartiesUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesCounterpartiesUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesCounterpartiesUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: referencesCounterpartiesUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: referencesCounterpartiesUrls.list,
    action: PermissionActions.READ,
  },
};
