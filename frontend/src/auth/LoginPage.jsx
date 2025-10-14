import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContex";
import LoginForm from "./LoginForm";
export default function LoginPage() {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: 24 }}>Cargando…</div>;
  if (user) return <Navigate to="/" replace />; // si ya está logueado, no muestres el login

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <LoginForm />
    </div>
  );
}
