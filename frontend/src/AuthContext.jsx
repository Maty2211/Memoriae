import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Crear el contexto
const AuthContext = createContext(null);

// Función para obtener el token desde localStorage
const getLocalToken = () => localStorage.getItem('auth_token') || null;

// Hook para consumir el contexto
export const useAuth = () => useContext(AuthContext);

// 2. Componente Proveedor (Provider)
export const AuthProvider = ({ children }) => {
    // Inicializamos el token desde localStorage
    const [token, setToken] = useState(getLocalToken()); 
    const [isAuthenticated, setIsAuthenticated] = useState(!!getLocalToken());
    
    // URL del endpoint de login de Django (usa /api/auth/login/ por el proxy)
    const LOGIN_URL = '/api/auth/login/'; 

    // Lógica para iniciar sesión y obtener el token JWT
    const login = async (username, password) => {
        try {
            // Nota: El proxy en vite.config.js redirige /api/auth/login/ a Django:8000
            const response = await axios.post(LOGIN_URL, { username, password });
            
            // Django/dj-rest-auth devuelve el token en 'key' o 'token'
            const newToken = response.data.key || response.data.token; 
            
            if (newToken) {
                localStorage.setItem('auth_token', newToken);
                setToken(newToken);
                setIsAuthenticated(true);
                return { success: true };
            }

        } catch (error) {
            console.error("Login failed:", error.response?.data);
            return { success: false, error: error.response?.data || "Error de conexión al servidor" };
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setToken(null);
        setIsAuthenticated(false);
    };

    // 3. El valor que se comparte a la aplicación
    const contextValue = {
        token,
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
