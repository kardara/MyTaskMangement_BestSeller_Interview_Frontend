import { useState } from "react";
import { login as apiLogin, register as apiRegister } from "../api/auth";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  UserResponse,
} from "../types/auth";

export function useAuth() {
  const [user, setUser] = useState<UserResponse | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  const login = async (data: LoginRequest) => {
    const res: AuthResponse = await apiLogin(data);
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("token", res.token);
    return res;
  };

  const register = async (data: RegisterRequest) => {
    return apiRegister(data);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return { user, token, login, register, logout };
}
