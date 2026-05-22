import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-600/30 border-t-indigo-600 animate-spin" />
          <p className="text-slate-500 text-sm font-medium">Securing session...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;