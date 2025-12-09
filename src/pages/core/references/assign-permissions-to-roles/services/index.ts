import type { IGetAssignmentsResponse, IUpdateAssigmentsPayload } from './types';

import axiosInstance from 'src/lib/axios';

import { referencesAssignPermissionsToRolesUrls } from './urls';

export const REFERENCES_ASSIGN_PERMISSIONS_TO_ROLES_BASE_QUERY_KEY =
  'REFERENCES_ASSIGN_PERMISSIONS_TO_ROLES_BASE_QUERY_KEY';

export const referencesAssignPermissionsToRolesService = {
  getAssignments: async () => {
    const response = await axiosInstance.get<IGetAssignmentsResponse>(
      referencesAssignPermissionsToRolesUrls.assignments
    );
    return response;
  },
  updateAssignments: async (payload: IUpdateAssigmentsPayload) => {
    const response = await axiosInstance.put(
      referencesAssignPermissionsToRolesUrls.assignments,
      payload
    );
    return response;
  },
};
