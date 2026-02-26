import { login as apiLogin, register as apiRegister } from "../api/auth";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  UserResponse,
} from "../types/auth";
import { useLocalStorage } from "./useLocalStorage";

export function useAuth() {
  const [user, setUser] = useLocalStorage<UserResponse>("user");
  const [token, setToken] = useLocalStorage<string>("token");

  const login = async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await apiLogin(data);
    setUser(res.user);
    setToken(res.token);
    return res;
  };

  const register = async (data: RegisterRequest): Promise<string> => {
    return apiRegister(data);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === "ADMIN";

  return { user, token, isAuthenticated, isAdmin, login, register, logout };
}
