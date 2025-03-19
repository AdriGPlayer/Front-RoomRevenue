import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ allowedRoles, redirectPath = "/" }) {
  const userType = localStorage.getItem("userType");

  if (!userType || (allowedRoles && !allowedRoles.includes(userType))) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
