import { PermissionActions } from 'src/auth/permissions/types';

import { referencesCountriesUrls } from '../services/urls';

export const referencesCountriesPermissions = {
  index: {
    resource: referencesCountriesUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesCountriesUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesCountriesUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesCountriesUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: referencesCountriesUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: referencesCountriesUrls.list,
    action: PermissionActions.READ,
  },
};
