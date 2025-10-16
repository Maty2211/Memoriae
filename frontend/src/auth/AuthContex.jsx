import { createContext, useContext, useEffect, useState } from "react";
import * as auth from "../api/auth";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario si hay cookies validas
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const u = await auth.me();
        if (mounted) setUser(u);
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const login = async (email, password) => {
    await auth.login({ email, password });
    const u = await auth.me();
    setUser(u);
  };

  const register = async (data) => {
    await auth.register(data);
    const u = await auth.me();
    setUser(u);
  };

  const logout = async () => {
    await auth.logout();
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}