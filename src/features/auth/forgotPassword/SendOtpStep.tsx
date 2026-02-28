import React from "react";
import { Link } from "react-router-dom";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useAsyncAction } from "../../../hooks/useAsyncAction";
import { sendOtp } from "../../../api/auth";

interface Props {
  email: string;
  setEmail: (v: string) => void;
  onNext: () => void;
}

const SendOtpStep: React.FC<Props> = ({ email, setEmail, onNext }) => {
  const { loading, error, success, setSuccess, run } = useAsyncAction();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await run(async () => {
      const msg = await sendOtp(email);
      setSuccess(msg || "OTP sent to your email.");
      setTimeout(onNext, 1000);
    });
  };

  return (
    <form
      className="space-y-5"
      aria-label="Send OTP form"
      onSubmit={handleSubmit}
    >
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
      {success && (
        <div className="text-green-600 text-sm text-center">{success}</div>
      )}

      <div>
        <label
          htmlFor="fp-email"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Email
        </label>
        <Input
          id="fp-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="focus-ring w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
          placeholder="Enter your email"
        />
      </div>

      <Button
        type="submit"
        className="focus-ring w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-slate-900 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Sending OTP..." : "Send OTP"}
      </Button>

      <p className="pt-1 text-center text-sm text-slate-600">
        Remembered your password?{" "}
        <Link
          to="/login"
          className="focus-ring rounded font-medium text-slate-900 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SendOtpStep;
