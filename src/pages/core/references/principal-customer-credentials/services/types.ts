export enum Statuses {
  all = 'all',
  active = 'active',
  deleted = 'deleted',
}

export type IGetCountsByStatusResponse = Record<Statuses, number>;

export interface IIndexResponse {
  result: Array<{
    id: number;
    serviceId: number;
    username: string;
    password: string;
    additionalInformationUz: string | null;
    additionalInformationRu: string | null;
    principalCustomerId: number;
    createdAt: Date;
    updatedAt: Date;
    status: 'active' | 'deleted';
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

export type IListResponse = Array<{ id: number; username: string }>;
