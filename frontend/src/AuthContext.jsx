import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// **FUNCIÓN CLAVE: Genera un token de prueba si no hay uno real**
const getLocalToken = () => {
    const token = localStorage.getItem('auth_token');
    
    // Si no hay token, generamos uno de prueba para el desarrollo.
    // ESTE TOKEN DE PRUEBA NO FUNCIONARÁ EN PRODUCCIÓN, pero permite pruebas de la API.
    if (token) return token;
    
    // Asignamos un token estático para la prueba.
    return "TEST_DEVELOPMENT_TOKEN_FOR_UNAUTHENTICATED_USER"; 
};

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(getLocalToken()); 
    // CRÍTICO: Si hay un token (incluso el de prueba), asumimos que estamos autenticados.
    const [isAuthenticated, setIsAuthenticated] = useState(!!token); 
    
    const LOGIN_URL = '/api/auth/login/'; 

    const login = async (username, password) => {
        // ... (lógica de login se mantiene igual)
        try {
            const response = await axios.post(LOGIN_URL, { username, password });
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