import { PermissionActions } from 'src/auth/permissions/types';

import { principalCustomersUrls } from '../services/urls';

export const principalCustomersPermissions = {
  index: {
    resource: principalCustomersUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: principalCustomersUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: principalCustomersUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: principalCustomersUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: principalCustomersUrls.countsByStatus,
    action: PermissionActions.READ,
  },
};
