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
    monthlyPrice: number;
    currencyId: number;
    currencyName: string;
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

export type IListResponse = Array<{
  id: number;
  nameUz: string;
  nameRu: string;
  monthlyPrice: number;
  currency: { id: number; nameUz: string };
}>;
