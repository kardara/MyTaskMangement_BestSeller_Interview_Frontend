import React, { useState } from "react";
import SendOtpStep from "./forgotPassword/SendOtpStep";
import VerifyOtpStep from "./forgotPassword/VerifyOtpStep";
import ResetPasswordStep from "./forgotPassword/ResetPasswordStep";

type Step = "email" | "otp" | "password";

const stepMeta: Record<
  Step,
  { heading: string; sub: (email?: string) => string }
> = {
  email: {
    heading: "Forgot Password",
    sub: () => "Enter your email address and we'll send you an OTP",
  },
  otp: {
    heading: "Verify OTP",
    sub: (email) => `We sent a code to ${email}. Enter it below to continue`,
  },
  password: {
    heading: "Reset Password",
    sub: () => "Choose a strong new password for your account",
  },
};

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const { heading, sub } = {
    heading: stepMeta[step].heading,
    sub: stepMeta[step].sub(email),
  };

  return (
    <div className="mx-auto w-full m-20 shadow-2xl p-4 border border-yellow-50 rounded-2xl max-w-sm">
      <div className="mb-7 text-center">
        <h2 className="font-serif text-4xl font-semibold tracking-tight text-slate-900">
          {heading}
        </h2>
        <p className="mt-3 text-sm text-slate-600">{sub}</p>
      </div>

      {step === "email" && (
        <SendOtpStep
          email={email}
          setEmail={setEmail}
          onNext={() => setStep("otp")}
        />
      )}
      {step === "otp" && (
        <VerifyOtpStep
          email={email}
          otp={otp}
          setOtp={setOtp}
          onNext={() => setStep("password")}
          onResend={() => setStep("email")}
        />
      )}
      {step === "password" && <ResetPasswordStep email={email} />}
    </div>
  );
};

export default ForgotPassword;
