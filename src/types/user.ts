export type UserRole = "USER" | "ADMIN";

export interface User {
  userId: number;
  name: string;
  email: string;
  role: UserRole;
  deleted: boolean;
}

export interface UserFormRequest {
  name: string;
  email: string;
  password: string;
}

export interface UsersPage {
  content: User[];
  totalElements: number;
  totalPages: number;
  number: number;
}
