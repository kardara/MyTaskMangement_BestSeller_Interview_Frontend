import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useToggle } from "../../../hooks/useToggle";
import { useAsyncAction } from "../../../hooks/useAsyncAction";
import { verifyOtp, resetPassword } from "../../../api/auth";

interface Props {
  email: string;
  onResend: () => void;
}

const VerifyAndResetStep: React.FC<Props> = ({ email, onResend }) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, toggleShowPassword] = useToggle();
  const [showConfirm, toggleShowConfirm] = useToggle();
  const { loading, error, success, setSuccess, run } = useAsyncAction();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await run(async () => {
      if (newPassword !== confirmPassword)
        throw new Error("Passwords do not match.");
      await verifyOtp(email, otp);
      const msg = await resetPassword(email, newPassword);
      setSuccess(msg || "Password reset successfully!");
      setTimeout(() => navigate("/login"), 1500);
    });
  };

  return (
    <form
      className="space-y-5"
      aria-label="Reset password form"
      onSubmit={handleSubmit}
    >
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
      {success && (
        <div className="text-green-600 text-sm text-center">{success}</div>
      )}

      <div>
        <label
          htmlFor="fp-otp"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          OTP Code
        </label>
        <Input
          id="fp-otp"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          maxLength={6}
          className="focus-ring w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 tracking-widest text-center"
          placeholder="Enter OTP"
        />
      </div>

      <div>
        <label
          htmlFor="fp-new-password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          New Password
        </label>
        <div className="relative">
          <Input
            id="fp-new-password"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="focus-ring w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 pr-12 text-sm text-slate-900 placeholder:text-slate-400"
            placeholder="Enter new password"
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-slate-500 hover:bg-white"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="fp-confirm-password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Confirm Password
        </label>
        <div className="relative">
          <Input
            id="fp-confirm-password"
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="focus-ring w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 pr-12 text-sm text-slate-900 placeholder:text-slate-400"
            placeholder="Confirm new password"
          />
          <button
            type="button"
            onClick={toggleShowConfirm}
            className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-slate-500 hover:bg-white"
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="focus-ring w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-slate-900 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </Button>

      <p className="pt-1 text-center text-sm text-slate-600">
        Didn&apos;t receive the code?{" "}
        <button
          type="button"
          className="focus-ring rounded font-medium text-slate-900 hover:underline"
          onClick={onResend}
        >
          Resend OTP
        </button>
      </p>
    </form>
  );
};

export default VerifyAndResetStep;
