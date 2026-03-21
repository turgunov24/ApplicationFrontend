export enum Statuses {
  all = 'all',
  active = 'active',
  deleted = 'deleted',
  finished = 'finished',
}

export type IGetCountsByStatusResponse = Record<Statuses, number>;

export interface IIndexResponse {
  result: Array<{
    id: number;
    principalCustomerId: number;
    tariffId: number;
    startDate: Date;
    endDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    status: 'active' | 'deleted' | 'finished';
    createdBy: number;
    tariff: {
      id: number;
      nameUz: string;
      nameRu: string;
      monthlyPrice: number;
      currency: {
        id: number;
        name: string;
      };
    };
    principalCustomer: {
      id: number;
      name: string;
      counterparty: {
        id: number;
        name: string;
      };
    };
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

export type IListResponse = Array<{ id: number; principalCustomerId: number; tariffId: number; startDate: Date; endDate: Date | null }>;
