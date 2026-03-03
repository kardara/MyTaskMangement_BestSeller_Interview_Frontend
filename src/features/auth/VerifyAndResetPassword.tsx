import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAsyncAction } from "../../hooks/useAsyncAction";
import { verifyOtp, resetPassword } from "../../api/auth";

const VerifyAndResetPassword: React.FC = () => {
  const location = useLocation();
  const email = location.state?.email as string | undefined;

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, error, success, run } = useAsyncAction();
  const navigate = useNavigate();

  if (!email) {
    return (
      <div className="mx-auto w-full m-20 shadow-2xl p-4 border border-yellow-50 rounded-2xl max-w-sm text-center">
        <p className="text-slate-600 text-sm mb-4">
          No email provided. Please start from the forgot password page.
        </p>
        <Link
          to="/forgot-password"
          className="font-medium text-slate-900 hover:underline text-sm"
        >
          Go back
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return;
    await run(async () => {
      await verifyOtp(email, otp);
      await resetPassword(email, newPassword);
      navigate("/login");
    });
  };

  return (
    <div className="mx-auto w-full m-20 shadow-2xl p-4 border border-yellow-50 rounded-2xl max-w-sm">
      <div className="mb-7 text-center">
        <h2 className="font-serif text-4xl font-semibold tracking-tight text-slate-900">
          Reset Password
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          Enter the OTP sent to{" "}
          <span className="font-medium text-slate-800">{email}</span>
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
            htmlFor="otp"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            OTP
          </label>
          <Input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            placeholder="Enter OTP"
            className="focus-ring w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            New Password
          </label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Enter new password"
            className="focus-ring w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm new password"
            className="focus-ring w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
          />
          {confirmPassword && newPassword !== confirmPassword && (
            <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading || newPassword !== confirmPassword}
          className="focus-ring w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-slate-900 disabled:opacity-60"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>

        <p className="pt-1 text-center text-sm text-slate-600">
          <Link
            to="/forgot-password"
            className="focus-ring rounded font-medium text-slate-900 hover:underline"
          >
            Resend OTP
          </Link>
        </p>
      </form>
    </div>
  );
};

export default VerifyAndResetPassword;
