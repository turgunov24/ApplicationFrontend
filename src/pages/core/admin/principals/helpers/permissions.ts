import { PermissionActions } from 'src/auth/permissions/types';

import { principalsUrls } from '../services/urls';

export const principalsPermissions = {
  index: {
    resource: principalsUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: principalsUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: principalsUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: principalsUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: principalsUrls.countsByStatus,
    action: PermissionActions.READ,
  },
};
