import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAsyncAction } from "../../hooks/useAsyncAction";
import { sendOtp } from "../../api/auth";

const SendOtp: React.FC = () => {
  const [email, setEmail] = useState("");
  const { loading, error, success, setSuccess, run } = useAsyncAction();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await run(async () => {
      const msg = await sendOtp(email);
      setSuccess(msg || "OTP sent to your email.");
      setTimeout(() => navigate("/reset-password", { state: { email } }), 1000);
    });
  };

  return (
    <div className="mx-auto w-full m-20 shadow-2xl p-4 border border-yellow-50 rounded-2xl max-w-sm">
      <div className="mb-7 text-center">
        <h2 className="font-serif text-4xl font-semibold tracking-tight text-slate-900">
          Forgot Password
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          Enter your email and we'll send you an OTP
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}
        {success && (
          <div className="text-green-600 text-sm text-center">{success}</div>
        )}

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="focus-ring w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="focus-ring w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-slate-900 disabled:opacity-60"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </Button>

        <p className="pt-1 text-center text-sm text-slate-600">
          <Link
            to="/login"
            className="focus-ring rounded font-medium text-slate-900 hover:underline"
          >
            Back to Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SendOtp;
