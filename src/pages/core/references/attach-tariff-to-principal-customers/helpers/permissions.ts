import { PermissionActions } from 'src/auth/permissions/types';

import { attachTariffToPrincipalCustomersUrls } from '../services/urls';

export const attachTariffToPrincipalCustomersPermissions = {
  index: {
    resource: attachTariffToPrincipalCustomersUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: attachTariffToPrincipalCustomersUrls.index,
    action: PermissionActions.CREATE,
  },
  delete: {
    resource: attachTariffToPrincipalCustomersUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: attachTariffToPrincipalCustomersUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: attachTariffToPrincipalCustomersUrls.list,
    action: PermissionActions.READ,
  },
};
