import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: '#FFE600',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 60,
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* LOGO */}
      <Link to="/" style={{
        fontWeight: '900',
        fontSize: '1.4rem',
        color: '#333',
        textDecoration: 'none',
        letterSpacing: '-0.5px'
      }}>
        🌿 EcoMarket
      </Link>

      {/* BARRA DE BÚSQUEDA FALSA (estética) */}
      <div style={{
        flex: 1,
        maxWidth: 500,
        margin: '0 30px'
      }}>
        <div style={{
          display: 'flex',
          backgroundColor: '#fff',
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid #ccc'
        }}>
          <input
            type="text"
            placeholder="Buscar productos..."
            style={{
              flex: 1,
              padding: '8px 14px',
              border: 'none',
              outline: 'none',
              fontSize: '0.95rem'
            }}
          />
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#FFE600',
            border: 'none',
            borderLeft: '1px solid #ccc',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>🔍</button>
        </div>
      </div>

      {/* MENÚ DERECHO */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {token ? (
          <>
            {/* CARRITO */}
            <Link to="/carrito" style={{
              color: '#333',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              position: 'relative'
            }}>
              <span style={{ fontSize: '1.4rem' }}>🛒</span>
              <span>Carrito</span>
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute',
                  top: -4,
                  right: -8,
                  backgroundColor: '#e53e3e',
                  color: 'white',
                  borderRadius: '50%',
                  width: 18,
                  height: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 'bold'
                }}>
                  {totalItems}
                </span>
              )}
            </Link>

            {/* MIS COMPRAS */}
            <Link to="/mis-compras" style={{
              color: '#333',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}>
              <span style={{ fontSize: '1.4rem' }}>📦</span>
              <span>Mis Compras</span>
            </Link>

            {/* ADMIN */}
            {user.rol === 'admin' && (
              <Link to="/admin" style={{
                color: '#333',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                <span style={{ fontSize: '1.4rem' }}>⚙️</span>
                <span>Admin</span>
              </Link>
            )}

            {/* USUARIO + LOGOUT */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              color: '#333'
            }}>
              <span style={{ fontSize: '1.4rem' }}>👤</span>
              <span>{user.nombre?.split(' ')[0] || 'Mi Cuenta'}</span>
            </div>

            <button onClick={handleLogout} style={{
              backgroundColor: '#333',
              color: '#FFE600',
              border: 'none',
              borderRadius: 4,
              padding: '6px 14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}>
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/register" style={{
              color: '#333',
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}>
              Crear cuenta
            </Link>
            <Link to="/login" style={{
              backgroundColor: '#333',
              color: '#FFE600',
              padding: '7px 16px',
              borderRadius: 4,
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}>
              Ingresar
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
