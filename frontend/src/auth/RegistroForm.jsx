import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContex";
import { useState } from "react";

export default function RegistroForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const fd = new FormData(e.currentTarget);
    const data = {
      username:  (fd.get("username")  || "").trim(),
      email:     (fd.get("email")     || "").trim(),
      password1: (fd.get("password1") || ""),
      password2: (fd.get("password2") || ""),
      nombre:    (fd.get("nombre")    || "").trim(),
      apellido:  (fd.get("apellido")  || "").trim(),
    };

    try {
      await register(data);      // llama a src/api/auth.register(...)
      navigate("/");
    } catch (e) {
      let msg = "Registro falló";
      if (e.json) {
        const details = await e.json; //json del backend
        msg = JSON.stringify(details);
      }
      setError(msg);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>Crear una cuenta</h2>
        
        <label htmlFor="id_user">Nombre de usuario</label>
        <input type="text" name="username" id="id_user" required />

        <label htmlFor="id_nombre">Nombre</label>
        <input type="text" name="nombre" id="id_nombre" />

        <label htmlFor="id_apellido">Apellido</label>
        <input type="text" name="apellido" id="id_apellido" />

        <label htmlFor="id_email">Email</label>
        <input type="email" name="email" id="id_email" required autoComplete="email" />

        <label htmlFor="id_password1">Contraseña</label>
        <input type="password" name="password1" id="id_password1" required autoComplete="new-password" />

        <label htmlFor="id_password2">Repetir contraseña</label>
        <input type="password" name="password2" id="id_password2" required autoComplete="new-password" />

        <button type="submit">Siguiente</button>

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <p>¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
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