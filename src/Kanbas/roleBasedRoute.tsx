import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RoleBasedRoute({ requiredRole, children }: { requiredRole: string, children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (!currentUser) {
    return <Navigate to="/Kanbas/Account/Signin" />;
  }

  if (currentUser.role === requiredRole) {
    return children;
  } else {
    return <Navigate to="/Kanbas/Forbidden" />; 
  }
}
