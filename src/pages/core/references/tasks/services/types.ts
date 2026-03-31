export enum Statuses {
  all = 'all',
  pending = 'pending',
  active = 'active',
  finished = 'finished',
  send = 'send',
  cancelled = 'cancelled',
  archived = 'archived',
  deleted = 'deleted',
}

export type IGetCountsByStatusResponse = Record<Statuses, number>;

export interface IIndexResponse {
  result: Array<{
    id: number;
    taskId: number;
    translationKey: string;
    description: string | null;
    deadline: Date | null;
    principalCustomerId: number;
    createdAt: Date;
    updatedAt: Date;
    status: 'pending' | 'active' | 'finished' | 'send' | 'cancelled' | 'archived' | 'deleted';
    createdBy: number;
  }>;
  pagination: {
    currentPage: number;
    dataPerPage: number;
    totalData: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export type IListResponse = Array<{
  id: number;
  taskId: number;
  translationKey: string;
}>;
