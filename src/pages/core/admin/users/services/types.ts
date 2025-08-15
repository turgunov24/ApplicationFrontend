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

export interface IIndexResponse {
  result: Array<{ id: number; name: string; username: string }>;
  pagination: {
    page: number;
    pageCount: number;
    sizePerPage: number;
  };
}
