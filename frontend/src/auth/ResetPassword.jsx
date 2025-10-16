import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiFetch } from "../api/client";

export default function ResetPasswordConfirmPage() {
  const { uid, token } = useParams();
  const [password1, setP1] = useState("");
  const [password2, setP2] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await apiFetch(`/dj-rest-auth/password/reset/confirm/`, {
      method: "POST",
      body: JSON.stringify({ uid, token, new_password1: password1, new_password2: password2 }),
    });
    if (res.ok) nav("/login");
    else {
      const details = await res.json().catch(()=> ({}));
      setError(JSON.stringify(details));
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 360, margin: "40px auto" }}>
      <h2>Definir nueva contraseña</h2>
      <input type="password" placeholder="Nueva contraseña" value={password1} onChange={e=>setP1(e.target.value)} required />
      <input type="password" placeholder="Repetir contraseña" value={password2} onChange={e=>setP2(e.target.value)} required />
      <button type="submit">Guardar</button>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </form>
  );
}