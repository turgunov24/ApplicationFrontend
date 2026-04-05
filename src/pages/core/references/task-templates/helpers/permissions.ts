import { PermissionActions } from 'src/auth/permissions/types';

import { referencesTaskTemplatesUrls } from '../services/urls';

export const referencesTaskTemplatesPermissions = {
  index: {
    resource: referencesTaskTemplatesUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesTaskTemplatesUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesTaskTemplatesUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesTaskTemplatesUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: referencesTaskTemplatesUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: referencesTaskTemplatesUrls.list,
    action: PermissionActions.READ,
  },
};
