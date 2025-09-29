import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  allowedRole = "clinic_owner", // default role is admin
  guestOnly,
}) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (guestOnly && token) {
    // 🚫 Guests only → redirect logged-in users
    return <Navigate to="/dashboard" replace />;
  }

  if (!guestOnly && (!token || role !== allowedRole)) {
    // 🚫 Auth required but no token/wrong role
    return <Navigate to="/" replace />;
  }

  return children;
}
