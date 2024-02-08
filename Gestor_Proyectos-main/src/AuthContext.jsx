import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // Funciones para el inicio de sesión y cierre de sesión
    const login = () => {
        setIsLoggedIn(true);
        // Aquí puedes agregar lógica para determinar si el usuario es administrador
        setIsAdmin(true); // Supongamos que todos los usuarios que inician sesión son administradores por ahora
    };

    const logout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);
