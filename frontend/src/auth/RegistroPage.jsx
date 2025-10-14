import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContex";
import RegistroForm from "./RegistroForm";

export default function RegisterPage() {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: 24 }}>Cargando…</div>;
  if (user) return <Navigate to="/" replace />; // si ya está logueado, no mostrar registro

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2 style={{ marginBottom: 16 }}>Crear cuenta</h2>
      <RegistroForm />
    </div>
  );
}