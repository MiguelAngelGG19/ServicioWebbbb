import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Este componente recibe otro componente como "hijo" (children)
export function ProtectedRoute({ children }) {
    const { user } = useContext(AuthContext);

    // Si NO hay usuario en sesión, lo redirige a la página de login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Si SÍ hay usuario, lo deja pasar y muestra el contenido original
    return children;
}