import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Creamos el contexto (Esta es la "caja" vacía)
export const AuthContext = createContext();

// 2. Creamos el Proveedor (Este es el componente que llena la "caja" de información)
export const AuthProvider = ({ children }) => {
    // Estado para guardar la información del usuario
    const [user, setUser] = useState(null);

    // Al cargar la app, revisamos si ya hay un token guardado en el navegador
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Por simplicidad en esta fase, simularemos que el usuario existe si hay token.
            setUser({ nombre: 'Administrador' }); 
        }
    }, []);

    // Función para iniciar sesión
    const login = async (email, password) => {
        try {
            // Hacemos la petición a la API
            const respuesta = await axios.post('http://localhost:4000/api/auth/login', {
                email,
                password
            });
            
            // Inspeccionamos la respuesta para asegurar la estructura
            console.log("Respuesta del login:", respuesta.data);

            const token = respuesta.data.token;
            
            // Verificamos que el token exista antes de guardarlo
            if (token) {
                localStorage.setItem('token', token); 
                // Ajustamos la asignación del usuario basándonos en una estructura genérica segura
                const nombreUsuario = respuesta.data.user?.nombre || 'Administrador'; 
                setUser({ nombre: nombreUsuario }); 
                return true; // Login exitoso
            } else {
                console.error('El servidor no devolvió un token válido.');
                return false;
            }

        } catch (error) {
            console.error('Error en login:', error);
            return false; // Falló el login
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('token'); // Borramos el JWT del navegador
        setUser(null); // Eliminamos al usuario de la memoria de React
    };

    // 3. Retornamos el Proveedor
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};