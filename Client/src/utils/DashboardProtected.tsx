

import { ReactNode } from "react";
import { verifyToken } from "./verifyToken";
import { Navigate } from "react-router-dom";

import { TUser, useCurrentToken } from "../redux/feature/authManage/authSlice";
import { useAppSelector } from "../redux/hook";



export const DashboardProtected = ({ children, role }: { children: ReactNode, role: string }) => {
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  if (!user?.email) {
    return <Navigate to="/login" />;
  }

  // Check if the user has the correct role
  if (role === "admin" && user?.role !== "admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  if (role === "customer" && user?.role !== "customer") {
    return <Navigate to="/user/dashboard" />;
  }

  return children; // Allow access to protected route
};
;