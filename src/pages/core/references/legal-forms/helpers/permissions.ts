import { PermissionActions } from 'src/auth/permissions/types';

import { referencesLegalFormsUrls } from '../services/urls';

export const referencesLegalFormsPermissions = {
  index: {
    resource: referencesLegalFormsUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesLegalFormsUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesLegalFormsUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesLegalFormsUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: referencesLegalFormsUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: referencesLegalFormsUrls.list,
    action: PermissionActions.READ,
  },
};
