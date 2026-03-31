import { PermissionActions } from 'src/auth/permissions/types';

import { referencesTasksCommentsUrls } from '../services/urls';

export const referencesTasksCommentsPermissions = {
  index: {
    resource: referencesTasksCommentsUrls.index,
    action: PermissionActions.READ,
  },
  create: {
    resource: referencesTasksCommentsUrls.index,
    action: PermissionActions.CREATE,
  },
  delete: {
    resource: referencesTasksCommentsUrls.index,
    action: PermissionActions.DELETE,
  },
};
