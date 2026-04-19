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
    taskTemplateId: number;
    startDate: Date;
    endDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    status: 'active' | 'deleted' | 'finished';
    createdBy: number;
    taskTemplate: {
      id: number;
      translationKey: string;
      description: string | null;
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

export type IListResponse = Array<{ id: number; principalCustomerId: number; taskTemplateId: number; startDate: Date; endDate: Date | null }>;
