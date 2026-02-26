import { RegisterRequest, LoginRequest, AuthResponse } from "../types/auth";
import { api, parseBackendError } from "./client";

export async function register(data: RegisterRequest): Promise<string> {
  try {
    const res = await api.post("/users/save", data);
    return res.data;
  } catch (error: unknown) {
    throw new Error(parseBackendError(error, "Registration failed."));
  }
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  try {
    const res = await api.post("/users/login", data);
    return res.data;
  } catch (error: unknown) {
    throw new Error(parseBackendError(error, "Login failed."));
  }
}
