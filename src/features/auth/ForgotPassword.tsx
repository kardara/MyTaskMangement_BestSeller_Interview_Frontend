import React from "react";
import { useForgotPassword } from "../../hooks/useForgotPassword";
import SendOtpStep from "./forgotPassword/SendOtpStep";
import VerifyAndResetStep from "./forgotPassword/VerifyAndResetStep";

const stepMeta = {
  email: {
    heading: "Forgot Password",
    sub: () => "Enter your email address and we'll send you an OTP",
  },
  reset: {
    heading: "Reset Password",
    sub: (email: string) =>
      `Enter the OTP sent to ${email} and your new password`,
  },
};

const ForgotPassword: React.FC = () => {
  const { step, email, setEmail, goToReset, goToEmail } = useForgotPassword();
  const { heading, sub } = stepMeta[step];

  return (
    <div className="mx-auto w-full m-20 shadow-2xl p-4 border border-yellow-50 rounded-2xl max-w-sm">
      <div className="mb-7 text-center">
        <h2 className="font-serif text-4xl font-semibold tracking-tight text-slate-900">
          {heading}
        </h2>
        <p className="mt-3 text-sm text-slate-600">{sub(email)}</p>
      </div>

      {step === "email" && (
        <SendOtpStep email={email} setEmail={setEmail} onNext={goToReset} />
      )}
      {step === "reset" && (
        <VerifyAndResetStep email={email} onResend={goToEmail} />
      )}
    </div>
  );
};

export default ForgotPassword;
