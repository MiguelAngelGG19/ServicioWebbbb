import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [exito, setExito] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            // Conectamos REAL al endpoint del backend
            await axios.post('http://localhost:4000/api/auth/registro', {
                nombre,
                email,
                password
            });
            setExito(true);
            // Redirigir al login después de 2 segundos
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Error al registrarse. Intenta de nuevo.');
        }
    };

    const styles = {
       container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#0f172a' },
        card: { backgroundColor: '#1e293b', padding: '30px', borderRadius: '8px', width: '350px', border: '1px solid #334155' },
        title: { textAlign: 'center', color: 'white', marginBottom: '20px' },
        input: { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white', boxSizing: 'border-box' },
        button: { width: '100%', padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '15px' },
        linkText: { color: '#94a3b8', textAlign: 'center', fontSize: '0.9rem', display: 'block' },
        link: { color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' },
        error: { color: '#ef4444', textAlign: 'center', marginBottom: '10px', fontSize: '0.9rem' },
        exito: { color: '#10b981', textAlign: 'center', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 'bold' }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Crear Cuenta</h2>
                {error && <p style={styles.error}>❌ {error}</p>}
                {exito && <p style={styles.exito}>✅ ¡Cuenta creada! Redirigiendo al login...</p>}
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
