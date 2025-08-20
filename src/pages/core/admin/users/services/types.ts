export enum Statuses {
  all = 'all',
  active = 'active',
  pending = 'pending',
  banned = 'banned',
  rejected = 'rejected',
}

export enum Roles {
  admin = 'admin',
  user = 'user',
  moderator = 'moderator',
  editor = 'editor',
  contributor = 'contributor',
  subscriber = 'subscriber',
}

export type IGetCountsByStatusResponse = Record<Statuses, number>;

export interface IIndexResponse {
  result: Array<{
    id: number;
    name: string;
    username: string;
    createdAt: Date;
    status: 'active' | 'pending' | 'banned' | 'rejected' ;
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
  fullName: string;
  username: string;
  email: string;
  phone: string;
  countryId: number;
  regionId: number;
  cityId: number;
  roleId: number;
  token: string | null;
  password: string;
  status: string;
  avatarPath: string;
  createdAt: Date;
  updatedAt: Date;
}
