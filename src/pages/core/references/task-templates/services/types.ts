export enum Statuses {
  all = 'all',
  active = 'active',
  inactive = 'inactive',
  deleted = 'deleted',
}

export enum Recurrences {
  once = 'once',
  monthly = 'monthly',
  fiscalQuarter = 'fiscalQuarter',
  yearly = 'yearly',
}

export type IGetCountsByStatusResponse = Record<Statuses, number>;

export interface IIndexResponse {
  result: Array<{
    id: number;
    translationKey: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    status: 'active' | 'inactive' | 'deleted';
    recurrence: 'once' | 'monthly' | 'fiscalQuarter' | 'yearly';
    date: Date | null;
    dayOfMonth: number | null;
    monthOfQuarter: number | null;
    monthOfYear: number | null;
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
  translationKey: string;
}>;
