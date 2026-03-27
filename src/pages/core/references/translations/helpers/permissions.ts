import { PermissionActions } from 'src/auth/permissions/types';

import { referencesTranslationsUrls } from '../services/urls';

export const referencesTranslationsPermissions = {
  index: {
    resource: referencesTranslationsUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesTranslationsUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesTranslationsUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesTranslationsUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: referencesTranslationsUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: referencesTranslationsUrls.list,
    action: PermissionActions.READ,
  },
};
