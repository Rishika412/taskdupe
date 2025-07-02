import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (!allowedRoles.includes(user.role)) {
    return <div className="text-center p-10 text-red-500 text-lg">Access Denied</div>;
  }

  return <Outlet />;
};

export default PrivateRoute;
