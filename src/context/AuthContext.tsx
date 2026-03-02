import {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { UserResponse, LoginRequest, RegisterRequest } from "../types/auth";
import { login as apiLogin, register as apiRegister } from "../api/auth";

// ── State & Actions ──────────────────────────────────────────────────────────

interface AuthState {
  user: UserResponse | null;
  token: string | null;
}

type AuthAction =
  | { type: "LOGIN"; user: UserResponse; token: string }
  | { type: "LOGOUT" };

// ── Reducer ───────────────────────────────────────────────────────────────────

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { user: action.user, token: action.token };
    case "LOGOUT":
      return { user: null, token: null };
    default:
      return state;
  }
}

function getInitialState(): AuthState {
  try {
    const rawToken = localStorage.getItem("token");
    const rawUser = localStorage.getItem("user");
    const token = rawToken ? (JSON.parse(rawToken) as string) : null;
    const user = rawUser ? (JSON.parse(rawUser) as UserResponse) : null;
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

interface AuthContextValue extends AuthState {
  login: (data: LoginRequest) => Promise<UserResponse>;
  register: (data: RegisterRequest) => Promise<string>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, undefined, getInitialState);

  // Sync auth state → localStorage whenever it changes
  useEffect(() => {
    if (state.token && state.user) {
      localStorage.setItem("token", JSON.stringify(state.token));
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [state]);

  const login = useCallback(async (data: LoginRequest) => {
    const res = await apiLogin(data);
    dispatch({ type: "LOGIN", user: res.user, token: res.token });
    return res.user;
  }, []);

  const register = useCallback(
    (data: RegisterRequest) => apiRegister(data),
    [],
  );

  const logout = useCallback(() => dispatch({ type: "LOGOUT" }), []);

  const value: AuthContextValue = {
    ...state,
    login,
    register,
    logout,
    isAuthenticated: !!state.token,
    isAdmin: state.user?.role === "ADMIN",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ── Hook ──────────────────────────────────────────────────────────────────────
// Exported separately via src/hooks/useAuth.ts to satisfy React fast-refresh.
export { AuthContext };
