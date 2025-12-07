import { PermissionActions } from 'src/auth/permissions/types';

import { usersUrls } from '../services/urls';

export const usersPermissions = {
  index: {
    resource: usersUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: usersUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: usersUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: usersUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: usersUrls.countsByStatus,
    action: PermissionActions.READ,
  },
};
