import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import SendOtp from "../features/auth/SendOtp";
import VerifyAndResetPassword from "../features/auth/VerifyAndResetPassword";
import AdminBoard from "../features/dashboard/AdminBoard";
import UserBoard from "../features/dashboard/UserBoard";
import UserManagement from "../features/users/UserManagement";
import { PrivateRoute, AdminRoute } from "./guards";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<SendOtp />} />
      <Route path="/reset-password" element={<VerifyAndResetPassword />} />
      <Route
        path="/adminDashboard"
        element={
          <AdminRoute>
            <AdminBoard />
          </AdminRoute>
        }
      />
      <Route
        path="/users"
        element={
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        }
      />
      <Route
        path="/userDashboard"
        element={
          <PrivateRoute>
            <UserBoard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
