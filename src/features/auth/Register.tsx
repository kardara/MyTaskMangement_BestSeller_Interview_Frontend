import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  interface RegisterError {
    message: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const msg = await register({ name, email, password });
      setSuccess(msg || "Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const errorObj = err as RegisterError;
      setError(errorObj.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full m-20 shadow-2xl p-4 border border-yellow-50 rounded-2xl max-w-sm">
      <div className="mb-7 text-center">
        <h2 className="font-serif text-4xl font-semibold tracking-tight text-slate-900 ">
          Create Account
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          Enter your details to register a new account
        </p>
      </div>

      <form
        className="space-y-5"
        aria-label="Register form"
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}
        {success && (
          <div className="text-green-600 text-sm text-center">{success}</div>
        )}
        <div>
          <label
            htmlFor="register-name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Name
          </label>
          <Input
            id="register-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="focus-ring w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label
            htmlFor="register-email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <Input
            id="register-email"
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
            htmlFor="register-password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="register-password"
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

        <Button
          type="submit"
          className="focus-ring w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-slate-900 disabled:opacity-60"
          aria-label="Register"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>

        <p className="pt-1 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="focus-ring rounded font-medium text-slate-900 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
