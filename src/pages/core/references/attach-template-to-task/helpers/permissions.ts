import { PermissionActions } from 'src/auth/permissions/types';

import { attachTemplateToTaskUrls } from '../services/urls';

export const attachTemplateToTaskPermissions = {
  index: {
    resource: attachTemplateToTaskUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: attachTemplateToTaskUrls.index,
    action: PermissionActions.CREATE,
  },
  update: {
    resource: attachTemplateToTaskUrls.index  ,
    action: PermissionActions.UPDATE,
  },
  delete: {
    resource: attachTemplateToTaskUrls.index,
    action: PermissionActions.DELETE,
  },
  getCountsByStatus: {
    resource: attachTemplateToTaskUrls.countsByStatus,
    action: PermissionActions.READ,
  },
  list: {
    resource: attachTemplateToTaskUrls.list,
    action: PermissionActions.READ,
  },
};
