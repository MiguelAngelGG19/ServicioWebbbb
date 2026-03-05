import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Creamos el contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Al cargar la app, revisamos si ya hay un token guardado
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Aquí podríamos desencriptar el token o hacer una petición al backend para validar.
            // Por simplicidad en esta fase, simularemos que el usuario existe si hay token.
            setUser({ nombre: 'Administrador' }); 
        }
    }, []);

    // Función para iniciar sesión
    const login = async (email, password) => {
        try {
            const respuesta = await axios.post('http://localhost:4000/api/auth/login', {
                email,
                password
            });
            
            const token = respuesta.data.token;
            localStorage.setItem('token', token); // Guardamos el JWT en el Local Storage
            setUser({ nombre: respuesta.data.usuario.nombre || 'Administrador' }); // Guardamos el usuario globalmente
            return true;
        } catch (error) {
            console.error('Error en login:', error);
            return false;
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('token'); // Borramos el JWT
        setUser(null); // Eliminamos al usuario de la memoria
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};