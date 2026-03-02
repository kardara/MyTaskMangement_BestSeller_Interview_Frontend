import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import ForgotPassword from "../features/auth/forgotPassword/index";
import AdminBoard from "../features/dashboard/AdminBoard";
import UserBoard from "../features/dashboard/UserBoard";
import UserManagement from "../features/users/UserManagement";
import { PrivateRoute, AdminRoute } from "./guards";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
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
