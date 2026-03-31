import { PermissionActions } from 'src/auth/permissions/types';

import { referencesTaskActionsHistoryUrls } from '../services/urls';

export const referencesTaskActionsHistoryPermissions = {
  index: {
    resource: referencesTaskActionsHistoryUrls.index,
    action: PermissionActions.READ,
  },
  changeStatus: {
    resource: referencesTaskActionsHistoryUrls.changeStatus,
    action: PermissionActions.CREATE,
  },
};
