import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export function ProtectedRoute({ children }) {
    const { user, cargandoSesion } = useContext(AuthContext);

    // Si todavía está buscando el token, mostramos una pantalla de espera
    if (cargandoSesion) {
        return <div style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>Verificando seguridad...</div>;
    }

    // Si ya terminó de buscar y NO hay usuario, lo saca
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}