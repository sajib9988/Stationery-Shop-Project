

import { ReactNode } from "react";
import { verifyToken } from "./verifyToken";
import { Navigate, useLocation } from "react-router-dom";
import { TUser, useCurrentToken } from "../redux/feature/authManage/authSlice";
import { useAppSelector } from "../redux/hook";


const PrivetUserRoute = ({
  children,

}: {
  children: ReactNode;
}) => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();

  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  if (!user?.email) {
    return <Navigate state={location?.pathname} to={'/login'} replace={true}></Navigate>;
  }

  return children;
};

export default PrivetUserRoute;
