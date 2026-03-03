import { useState } from "react";
import { login as apiLogin, register as apiRegister } from "../api/auth";
import { LoginRequest, RegisterRequest, UserResponse } from "../types/auth";

function getStoredToken(): string | null {
  try {
    const raw = localStorage.getItem("token");
    return raw ? (JSON.parse(raw) as string) : null;
  } catch {
    return null;
  }
}

function getStoredUser(): UserResponse | null {
  try {
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as UserResponse) : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [token, setTokenState] = useState<string | null>(getStoredToken);
  const [user, setUser] = useState<UserResponse | null>(getStoredUser);

  const login = async (data: LoginRequest) => {
    const res = await apiLogin(data);
    localStorage.setItem("token", JSON.stringify(res.token));
    localStorage.setItem("user", JSON.stringify(res.user));
    setTokenState(res.token);
    setUser(res.user);
    return res.user;
  };

  const register = (data: RegisterRequest) => apiRegister(data);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTokenState(null);
    setUser(null);
  };

  return {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    isAdmin: user?.role === "ADMIN",
  };
}
