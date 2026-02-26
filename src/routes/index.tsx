import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import AdminBoard from "../features/dashboard/AdminBoard";
import UserBoard from "../features/dashboard/UserBoard";
import { PrivateRoute } from "./guards";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/adminDashboard" element={<PrivateRoute><AdminBoard /></PrivateRoute>} />
      <Route path="/userDashboard" element={<PrivateRoute><UserBoard /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
