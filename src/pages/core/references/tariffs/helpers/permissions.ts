import { PermissionActions } from 'src/auth/permissions/types';

import { referencesTariffsUrls } from '../services/urls';

export const referencesTariffsPermissions = {
  index: {
    resource: referencesTariffsUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesTariffsUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesTariffsUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesTariffsUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: referencesTariffsUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: referencesTariffsUrls.list,
    action: PermissionActions.READ,
  },
};
