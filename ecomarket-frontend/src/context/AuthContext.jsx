import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Al cargar la app, recuperamos el usuario REAL guardado en localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const respuesta = await axios.post('http://localhost:4000/api/auth/login', {
                email,
                password
            });

            const token = respuesta.data.token;
            // Tu API devuelve 'usuario' (con o), no 'user'
            const usuarioLogueado = respuesta.data.usuario;

            if (token && usuarioLogueado) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(usuarioLogueado));
                setUser(usuarioLogueado);
                return true;
            } else {
                console.error('Respuesta del servidor incompleta:', respuesta.data);
                return false;
            }
        } catch (error) {
            console.error('Error en login:', error.response?.data || error.message);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
