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

export async function sendOtp(email: string): Promise<string> {
  try {
    const res = await api.post(
      `/forgot-password/send-otp?email=${encodeURIComponent(email)}`,
    );
    return res.data;
  } catch (error: unknown) {
    throw new Error(parseBackendError(error, "Failed to send OTP."));
  }
}

export async function verifyOtp(email: string, otp: string): Promise<string> {
  try {
    const res = await api.post(
      `/forgot-password/verify-otp/${otp}?email=${encodeURIComponent(email)}`,
    );
    return res.data;
  } catch (error: unknown) {
    throw new Error(parseBackendError(error, "OTP verification failed."));
  }
}

export async function resetPassword(
  email: string,
  newPassword: string,
): Promise<string> {
  try {
    const res = await api.post(
      `/forgot-password/reset-password?email=${encodeURIComponent(email)}&newPassword=${encodeURIComponent(newPassword)}`,
    );
    return res.data;
  } catch (error: unknown) {
    throw new Error(parseBackendError(error, "Password reset failed."));
  }
}
