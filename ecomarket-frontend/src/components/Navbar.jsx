import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export function Navbar() {
    const nombreTienda = "EcoMarket Pro";
    
    // REQUERIMIENTO DEL PDF: Extraer user y logout del AuthContext
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const styles = {
        nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '10px 20px', borderBottom: '2px solid #3b82f6' },
        logo: { color: 'white', margin: 0, fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' },
        menu: { listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0, alignItems: 'center' },
        link: { color: 'white', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'none' },
        userText: { color: '#94a3b8', marginRight: '10px' },
        logoutBtn: { backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
    };

    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.logo}>{nombreTienda}</Link>
            <ul style={styles.menu}>
                <li><Link to="/" style={styles.link}>Catálogo</Link></li>
                
                {/* RENDERIZADO CONDICIONAL BASADO EN EL ESTADO GLOBAL */}
                {user ? (
                    <li>
                        <span style={styles.userText}>Hola, {user.nombre}</span>
                        <button onClick={handleLogout} style={styles.logoutBtn}>Cerrar Sesión</button>
                    </li>
                ) : (
                    <li><Link to="/login" style={styles.link}>Iniciar sesión</Link></li>
                )}
            </ul>
        </nav>
    );
}