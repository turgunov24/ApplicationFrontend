import { PermissionActions } from 'src/auth/permissions/types';

import { referencesPrincipalCustomerCredentialsUrls } from '../services/urls';

export const referencesPrincipalCustomerCredentialsPermissions = {
  index: {
    resource: referencesPrincipalCustomerCredentialsUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesPrincipalCustomerCredentialsUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesPrincipalCustomerCredentialsUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesPrincipalCustomerCredentialsUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: referencesPrincipalCustomerCredentialsUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: referencesPrincipalCustomerCredentialsUrls.list,
    action: PermissionActions.READ,
  },
};
