import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";

interface Props {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const authStore = useSelector((state: RootState) => state.auth);
  if (!authStore.isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

export default ProtectedRoute;
