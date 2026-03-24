import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ← Link agregado aquí
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const exito = await login(email, password);
        if (exito) {
            navigate('/');
        } else {
            setError('Credenciales incorrectas o error de red. Intenta de nuevo.');
        }
    };

    const styles = {
        container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' },
        card: { backgroundColor: '#1e293b', padding: '30px', borderRadius: '8px', width: '350px', border: '1px solid #334155' },
        title: { textAlign: 'center', color: 'white', marginBottom: '20px' },
        input: { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white', boxSizing: 'border-box' },
        button: { width: '100%', padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
        error: { color: '#ef4444', textAlign: 'center', marginBottom: '10px', fontSize: '0.9rem' },
        linkText: { color: '#94a3b8', textAlign: 'center', fontSize: '0.9rem', display: 'block', marginTop: '15px' }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Iniciar Sesión</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" style={styles.button}>Entrar</button>
                </form>
                <span style={styles.linkText}>
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>
                        Regístrate aquí
                    </Link>
                </span>
            </div>
        </div>
    );
}
