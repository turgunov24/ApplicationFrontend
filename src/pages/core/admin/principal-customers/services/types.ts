export enum Statuses {
  all = 'all',
  active = 'active',
  pending = 'pending',
  banned = 'banned',
  rejected = 'rejected',
}

export type IGetCountsByStatusResponse = Record<Statuses, number>;

export interface IIndexResponse {
  result: Array<{
    id: number;
    name: string;
    principalId: number;
    clientTypeId: number;
    createdAt: Date;
    status: 'active' | 'pending' | 'banned' | 'rejected';
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
  name: string;
  principalId: number;
  clientTypeId: number;
  createdAt: Date;
}

export interface ICreateResponse {
  id: number;
  name: string;
  principalId: number;
  clientTypeId: number;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}

export type IListResponse = Array<{
  id: number;
  name: string;
}>;
