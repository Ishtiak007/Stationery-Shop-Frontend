import { logOut, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type TProtectedRouteProps = {
  children: ReactNode;
  role: ("user" | "admin")[];
};

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();
  const dispatch = useAppDispatch();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const user = verifyToken(token);

  if (!role.includes(user?.role)) {
    dispatch(logOut());
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
