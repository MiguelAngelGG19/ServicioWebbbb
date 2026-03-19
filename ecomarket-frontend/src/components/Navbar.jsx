import { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useWindowSize } from '../hooks/useWindowSize'; // ← agrega esto

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const { isMobile } = useWindowSize(); // ← agrega esto

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: '#3483fa',
      padding: '0 16px',
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
        fontWeight: '900', fontSize: '1.3rem',
        color: 'white', textDecoration: 'none',
        letterSpacing: '-0.5px', whiteSpace: 'nowrap'
      }}>
        🌿 {isMobile ? 'ECO' : 'EcoMarket'}
      </Link>

      {/* BÚSQUEDA — oculta en móvil */}
      {!isMobile && (
        <div style={{ flex: 1, maxWidth: 500, margin: '0 24px' }}>
          <div style={{
            display: 'flex', backgroundColor: '#fff',
            borderRadius: 6, overflow: 'hidden'
          }}>
            <input
              type="text"
              placeholder="Buscar productos..."
              style={{
                flex: 1, padding: '8px 14px',
                border: 'none', outline: 'none', fontSize: '0.95rem'
              }}
            />
            <button style={{
              padding: '8px 14px', backgroundColor: '#2968c8',
              border: 'none', cursor: 'pointer', color: 'white'
            }}>🔍</button>
          </div>
        </div>
      )}

      {/* MENÚ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20 }}>
        {token ? (
          <>
            <Link to="/carrito" style={{
              color: 'white', textDecoration: 'none',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', fontSize: '0.75rem',
              fontWeight: 'bold', position: 'relative'
            }}>
              <span style={{ fontSize: '1.4rem' }}>🛒</span>
              {!isMobile && <span>Carrito</span>}
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -8,
                  backgroundColor: '#e53e3e', color: 'white',
                  borderRadius: '50%', width: 18, height: 18,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold'
                }}>
                  {totalItems}
                </span>
              )}
            </Link>

            {!isMobile && (
              <Link to="/mis-compras" style={{
                color: 'white', textDecoration: 'none',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', fontSize: '0.75rem', fontWeight: 'bold'
              }}>
                <span style={{ fontSize: '1.4rem' }}>📦</span>
                <span>Mis Compras</span>
              </Link>
            )}

            {user.rol === 'admin' && (
              <Link to="/admin" style={{
                color: 'white', textDecoration: 'none',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', fontSize: '0.75rem', fontWeight: 'bold'
              }}>
                <span style={{ fontSize: '1.4rem' }}>⚙️</span>
                {!isMobile && <span>Admin</span>}
              </Link>
            )}

            {!isMobile && (
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', fontSize: '0.75rem',
                fontWeight: 'bold', color: 'white'
              }}>
                <span style={{ fontSize: '1.4rem' }}>👤</span>
                <span>{user.nombre?.split(' ')[0] || 'Cuenta'}</span>
              </div>
            )}

            <button onClick={handleLogout} style={{
              backgroundColor: 'white', color: '#3483fa',
              border: 'none', borderRadius: 6,
              padding: isMobile ? '6px 10px' : '7px 16px',
              fontWeight: 'bold', cursor: 'pointer',
              fontSize: isMobile ? '0.75rem' : '0.85rem'
            }}>
              {isMobile ? '🚪' : 'Salir'}
            </button>
          </>
        ) : (
          <>
            {!isMobile && (
              <Link to="/register" style={{
                color: 'white', fontWeight: 'bold',
                textDecoration: 'none', fontSize: '0.9rem'
              }}>
                Crear cuenta
              </Link>
            )}
            <Link to="/login" style={{
              backgroundColor: 'white', color: '#3483fa',
              padding: '7px 14px', borderRadius: 6,
              fontWeight: 'bold', textDecoration: 'none',
              fontSize: '0.85rem'
            }}>
              Ingresar
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
