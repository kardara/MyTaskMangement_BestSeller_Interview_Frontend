import { RegisterRequest, LoginRequest, AuthResponse } from "../types/auth";

// Get API base URL from .env (Vite convention: VITE_ prefix)
const API_BASE = import.meta.env.VITE_API_URL;

export async function register(data: RegisterRequest): Promise<string> {
  const res = await fetch(`${API_BASE}/users/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    let errorMsg = "Registration failed.";
    try {
      const err = await res.json();
      if (err && err.details && typeof err.details === "object") {
        const firstDetail = Object.values(err.details)[0];
        errorMsg = firstDetail || err.message || errorMsg;
      } else if (err && err.error) {
        errorMsg = err.error;
      } else if (err && err.message) {
        errorMsg = err.message;
      } else if (typeof err === "string") {
        errorMsg = err;
      }
    } catch {
      errorMsg = await res.text();
    }
    throw new Error(errorMsg);
  }
  return res.text();
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    let errorMsg = "Login failed.";
    try {
      const err = await res.json();
      if (err && err.details && typeof err.details === "object") {
        const firstDetail = Object.values(err.details)[0];
        errorMsg = firstDetail || err.message || errorMsg;
      } else if (err && err.error) {
        errorMsg = err.error;
      } else if (err && err.message) {
        errorMsg = err.message;
      } else if (typeof err === "string") {
        errorMsg = err;
      }
    } catch {
      errorMsg = await res.text();
    }
    throw new Error(errorMsg);
  }
  return res.json();
}
