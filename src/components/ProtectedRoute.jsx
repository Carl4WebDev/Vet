import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  allowedRoles = ["clinic_owner"], // supports array of roles
  guestOnly = false,
}) {
  // Safely read from localStorage
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;

  // 🧩 Handle guest-only pages (like login/register)
  if (guestOnly) {
    if (token) {
      // already logged in → redirect safely to dashboard
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  }

  // 🔒 Auth required
  if (!token) {
    // no token → go back to login
    return <Navigate to="/" replace />;
  }

  // 🧠 Role-based access control
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // unauthorized → prevent render loop and redirect once
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized: render the protected content
  return children;
}
