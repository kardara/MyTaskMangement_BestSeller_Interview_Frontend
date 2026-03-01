import { useState } from "react";

type Step = "email" | "reset";

export function useForgotPassword() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  const goToReset = () => setStep("reset");
  const goToEmail = () => setStep("email");

  return { step, email, setEmail, goToReset, goToEmail };
}
