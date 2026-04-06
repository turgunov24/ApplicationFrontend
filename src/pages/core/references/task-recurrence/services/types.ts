export enum Statuses {
  all = 'all',
  active = 'active',
  deleted = 'deleted',
}

export type IGetCountsByStatusResponse = Record<Statuses, number>;

export interface IIndexResponse {
  result: Array<{
    id: number;
    translationKey: string;
    token: string;
    description: string | null;
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

export type IListResponse = Array<{ id: number; translationKey: string; token: string }>;
