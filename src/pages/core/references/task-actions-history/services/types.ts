export interface IIndexResponse {
  result: Array<{
    id: number;
    taskId: number;
    type: 'changeStatus';
    status: 'pending' | 'active' | 'finished' | 'send' | 'cancelled' | 'archived' | 'deleted';
    createdAt: Date;
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
