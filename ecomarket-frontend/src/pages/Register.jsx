import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Register() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // En la siguiente fase conectaremos esto al endpoint /api/auth/registro
        console.log("Datos de registro:", { nombre, email, password });
        alert("Simulación de registro exitoso. Ya puedes iniciar sesión.");
    };

    const styles = {
        container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' },
        card: { backgroundColor: '#1e293b', padding: '30px', borderRadius: '8px', width: '350px', border: '1px solid #334155' },
        title: { textAlign: 'center', color: 'white', marginBottom: '20px' },
        input: { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white', boxSizing: 'border-box' },
        button: { width: '100%', padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '15px' },
        linkText: { color: '#94a3b8', textAlign: 'center', fontSize: '0.9rem', display: 'block' },
        link: { color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Crear Cuenta</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Nombre completo" 
                        style={styles.input} 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Correo electrónico" 
                        style={styles.input} 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        style={styles.input} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" style={styles.button}>Registrarse</button>
                </form>
                <span style={styles.linkText}>
                    ¿Ya tienes cuenta? <Link to="/login" style={styles.link}>Entrar aquí</Link>
                </span>
            </div>
        </div>
    );
}