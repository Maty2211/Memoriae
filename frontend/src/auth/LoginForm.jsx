import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContex";
import { useState } from "react";
import './login-register.css';
import mascota from "../assets/mascota.gif"

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
    <div className="login-all">
      <h2 className="saludo">¡Bienvenido!</h2>
      <div className="login-before-form">
        <img className="img-masc" src={mascota} alt="Mascota virtual"/>
      <div className="login-container">
        <h2>Iniciar sesion</h2>
      <form className="login-form" onSubmit={onSubmit}>
          <hr className="my-3" />
          <label htmlFor="id_email">Email</label>
          <input type="email" name="email" required id="id_email" autoComplete="email" />
          <hr className="my-3" />
          <label htmlFor="id_password">Contraseña</label>
          <input type="password" name="password" required id="id_password" autoComplete="current-password" />
          <hr className="my-3" />
        <button className="btn-todoOk"type="submit">Siguiente</button>

        {error && <p style={{ color: "crimson" }}>{error}</p>}
        <div className="S-Links">
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
        <p>
          ¿No tenés una cuenta? <Link to="/register">Registrarme</Link>
        </p>
        </div>
        <div className="btn-oauth">
          <a
            href="http://localhost:8000/accounts/google/login/"
          >
            Continuar con Google
          </a>
        </div>
      </form>
      </div>
      </div>
    </div>
  );
}