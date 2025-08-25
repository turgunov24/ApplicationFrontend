export enum Statuses {
  all = 'all',
  active = 'active',
  deleted = 'deleted',
}

export type IGetCountsByStatusResponse = Record<Statuses, number>;

export interface IIndexResponse {
  result: Array<{
    id: number;
    nameUz: string;
    nameRu: string;
    permissionGroupName: string;
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

export interface IGetResponse {
  id: number;
  nameUz: string;
  nameRu: string;
  permissionId: number;
}
