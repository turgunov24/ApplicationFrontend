export interface IIndexResponse {
  result: Array<{
    id: number;
    userId: number;
    lang: string;
    namespace: string;
    key: string;
    value: string;
    createdAt: Date;
    status: 'active' | 'deleted';
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
