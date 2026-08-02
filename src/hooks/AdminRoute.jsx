import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin"; 
import useAuth from "../hooks/useAuth";

const AdminRouter = ({ children }) => {
  // Grab BOTH loading and isLoading just in case your AuthProvider uses the other one!
  const { user, loading, isLoading } = useAuth();
  const [isAdmin, isAdminPending] = useAdmin();
  const location = useLocation(); 

  // If Firebase is still thinking...
  if (loading || isLoading || isAdminPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-white text-text-main">
        <span className="text-sm font-bold uppercase tracking-widest text-olive">Loading...</span>
      </div>
    );
  }

  // 1. If you are logged in AND you are the admin -> Let you in!
  if (user && isAdmin) {
    return children;
  }

  // 2. LOOP BREAKER: If you are logged in, but NOT the admin -> Send to Home
  if (user && !isAdmin) {
    console.warn("Access Denied: You are logged in, but not as the Admin.");
    return <Navigate to="/" replace />;
  }

  // 3. If you are NOT logged in at all -> Send to Login
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRouter;