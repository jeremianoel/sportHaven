import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const role = localStorage.getItem("role")
  if (!token) {
    return (
      <Navigate
        to={`/login?prevPage=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  if (role === 'admin') {
    return (
      <Navigate
        to={`/dashboard`}
        replace
      />
    );
  }

  return children || <Outlet />;
};

export default ProtectedRoute;