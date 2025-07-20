export interface User {
  fullName: string;
  username: string;
  sub: string;
  userId: number;
  roles: string[];
  location: string;
  iat: number;
  exp: number;
}
