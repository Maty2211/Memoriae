import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContex";
import RegistroForm from "./RegistroForm";

export default function RegisterPage() {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: 24 }}>Cargando…</div>;
  if (user) return <Navigate to="/" replace />; // si ya está logueado, no mostrar registro

  return (
    <div>
      <RegistroForm />
    </div>
  );
}