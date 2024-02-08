import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element, allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        // El usuario no está autenticado, redirigir al login
        return <Navigate to="/" />;
    }

    if (!allowedRoles.includes(user.id_rol)) {
        // El usuario no tiene el rol permitido, redirigir a una página de error o a otra página
        return <Navigate to="/home" />;
    }

    // Renderizar el elemento si el usuario está autenticado y tiene el rol permitido
    return <Route element={element} />;
};

export default PrivateRoute;
