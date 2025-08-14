export interface IAuthStore {
  user: any;
  accessToken: string | null  ;

  setUser: (user: any) => void;
  setAccessToken: (accessToken: string | null) => void;
}
