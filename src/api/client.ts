import axios from "axios";
import { BackendError } from "../types/auth";
import { getToken } from "../utils/token";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function parseBackendError(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error)) return fallback;

  const data: unknown = error.response?.data;

  if (typeof data === "string") return data;

  if (typeof data === "object" && data !== null) {
    const err = data as BackendError;
    if (err.details && typeof err.details === "object") {
      const firstDetail = Object.values(err.details)[0];
      return firstDetail ?? err.message ?? fallback;
    }
    if (err.error) return err.error;
    if (err.message) return err.message;
  }

  return fallback;
}
