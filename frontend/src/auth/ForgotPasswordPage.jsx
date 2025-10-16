import { useState } from "react";
import { apiFetch } from "../api/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await apiFetch(`/dj-rest-auth/password/reset/`, {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    if (res.ok) setDone(true);
    else setError("No pudimos enviar el email");
  };

  if (done) return <p>Si el email existe, te enviamos un enlace para restablecer la contraseña.</p>
  
  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 360, margin: "40px auto" }}>
      <h2>Recuperar contraseña</h2>
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required />
      <button type="submit">Enviar enlace</button>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </form>
  );
}