import { PermissionActions } from 'src/auth/permissions/types'

import { referencesAssignPermissionsToRolesUrls } from '../services/urls'

export const assignPermissionsToRolesPermissions = {
  index: {
    resource: referencesAssignPermissionsToRolesUrls.assignments,
    action: PermissionActions.READ,
  },
  update: {
    resource: referencesAssignPermissionsToRolesUrls.assignments,
    action: PermissionActions.UPDATE,
  },
};
