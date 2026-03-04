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
  role: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}

export interface BackendError {
  message?: string;
  error?: string;
  details?: Record<string, string>;
}
