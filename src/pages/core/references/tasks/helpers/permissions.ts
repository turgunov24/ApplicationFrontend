import { PermissionActions } from 'src/auth/permissions/types';

import { referencesTasksUrls } from '../services/urls';

export const referencesTasksPermissions = {
  index: {
    resource: referencesTasksUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesTasksUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesTasksUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesTasksUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: referencesTasksUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: referencesTasksUrls.list,
    action: PermissionActions.READ,
  },
};
