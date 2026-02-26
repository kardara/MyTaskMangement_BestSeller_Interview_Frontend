// src/types/auth.ts
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  userId: number;
  name: string;
  email: string;
  role: string; // "USER" | "ADMIN"
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}
