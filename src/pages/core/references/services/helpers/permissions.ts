import { PermissionActions } from 'src/auth/permissions/types';

import { referencesServicesUrls } from '../services/urls';

export const referencesServicesPermissions = {
  index: {
    resource: referencesServicesUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesServicesUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: referencesServicesUrls.index,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: referencesServicesUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: referencesServicesUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: referencesServicesUrls.list,
    action: PermissionActions.READ,
  },
};
