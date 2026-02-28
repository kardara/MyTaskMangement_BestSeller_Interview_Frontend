import React from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useAsyncAction } from "../../../hooks/useAsyncAction";
import { verifyOtp } from "../../../api/auth";

interface Props {
  email: string;
  otp: string;
  setOtp: (v: string) => void;
  onNext: () => void;
  onResend: () => void;
}

const VerifyOtpStep: React.FC<Props> = ({
  email,
  otp,
  setOtp,
  onNext,
  onResend,
}) => {
  const { loading, error, success, setSuccess, run } = useAsyncAction();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await run(async () => {
      const msg = await verifyOtp(email, otp);
      setSuccess(msg || "OTP verified successfully.");
      setTimeout(onNext, 1000);
    });
  };

  return (
    <form
      className="space-y-5"
      aria-label="Verify OTP form"
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

      <Button
        type="submit"
        className="focus-ring w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-slate-900 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
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

export default VerifyOtpStep;
