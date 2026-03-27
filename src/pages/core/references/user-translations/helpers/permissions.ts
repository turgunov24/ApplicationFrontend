import { PermissionActions } from 'src/auth/permissions/types';

import { referencesUserTranslationsUrls } from '../services/urls';

export const referencesUserTranslationsPermissions = {
  index: {
    resource: referencesUserTranslationsUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesUserTranslationsUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesUserTranslationsUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesUserTranslationsUrls.index,
    action: PermissionActions.DELETE,
  },
};
