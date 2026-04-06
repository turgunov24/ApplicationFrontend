import { PermissionActions } from 'src/auth/permissions/types';

import { referencesTaskTemplateCategoriesUrls } from '../services/urls';

export const referencesTaskTemplateCategoriesPermissions = {
  index: {
    resource: referencesTaskTemplateCategoriesUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesTaskTemplateCategoriesUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesTaskTemplateCategoriesUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesTaskTemplateCategoriesUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: referencesTaskTemplateCategoriesUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: referencesTaskTemplateCategoriesUrls.list,
    action: PermissionActions.READ,
  },
};
