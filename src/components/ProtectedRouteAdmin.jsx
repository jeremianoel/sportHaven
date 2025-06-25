import { Navigate } from "react-router-dom";

const ProtectedRouteAdmin = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.trim();

  if (!token || role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRouteAdmin;
