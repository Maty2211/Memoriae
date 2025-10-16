//Este archivo protege las rutas
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContex";

export default function PrivateRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div>Cargando…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
