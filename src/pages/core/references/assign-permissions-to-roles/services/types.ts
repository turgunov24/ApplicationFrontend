export type IGetAssignmentsResponse = Array<{
  id: number;
  permissions: Array<number>;
}>;

export interface IUpdateAssigmentsPayload {
  values: Array<{
    roleId: number;
    permissionIds: Array<number>;
  }>;
}
