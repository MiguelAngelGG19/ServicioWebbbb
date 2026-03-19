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
      backgroundColor: '#3483fa',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 64,
      boxShadow: '0 2px 8px rgba(52,131,250,0.4)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* LOGO */}
      <Link to="/" style={{
        fontWeight: '900',
        fontSize: '1.4rem',
        color: 'white',
        textDecoration: 'none',
        letterSpacing: '-0.5px',
        whiteSpace: 'nowrap'
      }}>
        🌿 EcoMarket
      </Link>

      {/* BARRA DE BÚSQUEDA */}
      <div style={{ flex: 1, maxWidth: 500, margin: '0 30px' }}>
        <div style={{
          display: 'flex',
          backgroundColor: '#fff',
          borderRadius: 6,
          overflow: 'hidden',
          border: '2px solid rgba(255,255,255,0.3)'
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
            backgroundColor: '#2968c8',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            color: 'white'
          }}>🔍</button>
        </div>
      </div>

      {/* MENÚ DERECHO */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {token ? (
          <>
            <Link to="/carrito" style={{
              color: 'white',
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
                  top: -4, right: -8,
                  backgroundColor: '#e53e3e',
                  color: 'white',
                  borderRadius: '50%',
                  width: 18, height: 18,
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

            <Link to="/mis-compras" style={{
              color: 'white', textDecoration: 'none',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', fontSize: '0.75rem', fontWeight: 'bold'
            }}>
              <span style={{ fontSize: '1.4rem' }}>📦</span>
              <span>Mis Compras</span>
            </Link>

            {user.rol === 'admin' && (
              <Link to="/admin" style={{
                color: 'white', textDecoration: 'none',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', fontSize: '0.75rem', fontWeight: 'bold'
              }}>
                <span style={{ fontSize: '1.4rem' }}>⚙️</span>
                <span>Admin</span>
              </Link>
            )}

            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', fontSize: '0.75rem',
              fontWeight: 'bold', color: 'white'
            }}>
              <span style={{ fontSize: '1.4rem' }}>👤</span>
              <span>{user.nombre?.split(' ')[0] || 'Mi Cuenta'}</span>
            </div>

            <button onClick={handleLogout} style={{
              backgroundColor: 'white',
              color: '#3483fa',
              border: 'none',
              borderRadius: 6,
              padding: '7px 16px',
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
              color: 'white', fontWeight: 'bold',
              textDecoration: 'none', fontSize: '0.9rem'
            }}>
              Crear cuenta
            </Link>
            <Link to="/login" style={{
              backgroundColor: 'white',
              color: '#3483fa',
              padding: '7px 16px',
              borderRadius: 6,
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
