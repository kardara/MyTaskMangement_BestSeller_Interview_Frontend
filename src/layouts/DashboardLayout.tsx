import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      className={`text-sm transition-colors ${pathname === to ? "text-white font-semibold" : "text-slate-400 hover:text-white"}`}
    >
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-6">
          <span className="font-bold text-lg tracking-tight">TaskBoard</span>
          {isAdmin ? (
            <>
              {navLink("/adminDashboard", "Board")}
              {navLink("/users", "Users")}
            </>
          ) : (
            navLink("/userDashboard", "Board")
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400 hidden sm:block">
            {user?.name ?? user?.email}
          </span>
          {isAdmin && (
            <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
              Admin
            </span>
          )}
          <button
            onClick={handleLogout}
            className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
