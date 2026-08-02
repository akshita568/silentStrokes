import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin"; 
import useAuth from "../hooks/useAuth";

const AdminRouter = ({ children }) => {
  const { user, isLoading } = useAuth();
  const [isAdmin, isAdminPending] = useAdmin();
  const location = useLocation();

  if (isLoading || isAdminPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-white text-text-main">
        <span className="text-sm font-bold uppercase tracking-widest text-olive">Loading...</span>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  // 👇 Passes the intended URL in the 'state' before sending you to login
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRouter;