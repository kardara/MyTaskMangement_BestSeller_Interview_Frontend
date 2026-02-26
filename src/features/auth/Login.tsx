import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  interface LoginError {
    message: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      // Route based on user role
      if (res.user.role === "ADMIN") {
        navigate("/adminDashboard");
      } else {
        navigate("/userDashboard");
      }
    } catch (err) {
      const errorObj = err as LoginError;
      setError(errorObj.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full m-20 shadow-2xl p-4 border border-yellow-50 rounded-2xl max-w-sm">
      <div className="mb-7 text-center">
        <h2 className="font-serif text-4xl font-semibold tracking-tight text-slate-900 ">
          Welcome
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          Enter your email and password to access your account
        </p>
      </div>

      <form
        className="space-y-5"
        aria-label="Login form"
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}
        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <Input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="focus-ring w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label
            htmlFor="login-password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="focus-ring w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 pr-12 text-sm text-slate-900 placeholder:text-slate-400"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-slate-500 hover:bg-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 text-sm">
          <a
            href="#"
            onClick={(event) => event.preventDefault()}
            className="focus-ring rounded text-slate-700 hover:text-slate-900 hover:underline"
          >
            Forgot Password
          </a>
        </div>
        <Button
          type="submit"
          className="focus-ring w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-slate-900 disabled:opacity-60"
          aria-label="Login"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        <p className="pt-1 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="focus-ring rounded font-medium text-slate-900 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
