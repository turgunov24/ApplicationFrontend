import { PermissionActions } from 'src/auth/permissions/types';

import { referencesCurrenciesUrls } from '../services/urls';

export const referencesCurrenciesPermissions = {
  index: {
    resource: referencesCurrenciesUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesCurrenciesUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesCurrenciesUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesCurrenciesUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: referencesCurrenciesUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: referencesCurrenciesUrls.list,
    action: PermissionActions.READ,
  },
};
