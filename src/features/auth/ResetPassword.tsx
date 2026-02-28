import { Navigate } from "react-router-dom";

// Reset password is handled as part of the ForgotPassword multi-step flow.
export default function ResetPassword() {
  return <Navigate to="/forgot-password" replace />;
}
