import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContex";
import { useState } from "react";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const email = fd.get("email");
    const password = fd.get("password");
    try {
      await login(email, password);   // llama a la API via AuthContext
      navigate("/");
    } catch (err) {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>Iniciar sesión</h2>

        <div className="mb-3">
          <label htmlFor="id_email">Email</label>
        </div>
        <div className="mb-3">
          <input type="email" name="email" required id="id_email" autoComplete="email" />
        </div>
        <hr className="my-3" />
        <div className="mb-3">
          <label htmlFor="id_password">Contraseña</label>
        </div>
        <div className="mb-3"> 
          <input type="password" name="password" required id="id_password" autoComplete="current-password" />
        </div>
        <hr className="my-3" />
        <button type="submit">Siguiente</button>

        {error && <p style={{ color: "crimson" }}>{error}</p>}
        <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
        <p>
          ¿No tenés una cuenta? <Link to="/register">Registrarme</Link>
        </p>
        <div style={{ marginTop: 12 }}>
          <a
            href="http://localhost:8000/accounts/google/login/"
            style={{ display: "inline-block", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
          >
            Continuar con Google
          </a>
        </div>
      </form>
    </div>
  );
}