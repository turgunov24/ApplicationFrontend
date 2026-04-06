import { PermissionActions } from 'src/auth/permissions/types';

import { referencesTaskRecurrenceUrls } from '../services/urls';

export const referencesTaskRecurrencePermissions = {
  index: {
    resource: referencesTaskRecurrenceUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesTaskRecurrenceUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesTaskRecurrenceUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesTaskRecurrenceUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: referencesTaskRecurrenceUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: referencesTaskRecurrenceUrls.list,
    action: PermissionActions.READ,
  },
};
