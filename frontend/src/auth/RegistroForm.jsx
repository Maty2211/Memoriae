import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContex";
import { useState } from "react";
import './login-register.css';
import mascota from "../assets/mascota.gif"
import './login-register.css';
import mascota from "../assets/mascota.gif"

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
    <div className="login-all">
      <h2 className="saludo">¡Bienvenido!</h2>
      <div className="login-before-form">
        <img className="img-masc" src={mascota} alt="Mascota virtual"/>
      <div/>
        <h2>Crear una cuenta</h2>
      <form className="login-form" onSubmit={onSubmit}>
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

        <button className="btn-todoOk" type="submit">Siguiente</button>
        <button className="btn-todoOk" type="submit">Siguiente</button>

        {error && <p style={{ color: "crimson" }}>{error}</p>}
        <div className="S-Links">
          <p >¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
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
  );
}