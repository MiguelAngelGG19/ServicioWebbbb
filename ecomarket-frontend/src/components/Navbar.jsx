import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';


function Navbar() {
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
      padding: '12px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      {/* LOGO */}
      <Link to="/" style={{
        fontSize: '1.6rem',
        fontWeight: 'bold',
        color: '#333',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        🌿 EcoMarket
      </Link>

      {/* MENU */}
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        gap: 25,
        margin: 0,
        padding: 0
      }}>
        <li>
          <Link to="/" style={{
            color: '#333',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}>
            🏠 Inicio
          </Link>
        </li>

        {token ? (
          <>
            {/* CARRITO CON CONTADOR */}
            <li style={{ position: 'relative' }}>
              <Link to="/carrito" style={{
                color: '#333',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}>
                🛒 Carrito
                {totalItems > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-15px',
                    backgroundColor: '#e53e3e',
                    color: 'white',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>

            {/* MIS COMPRAS */}
            <li>
              <Link to="/mis-compras" style={{
                color: '#333',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}>
                📦 Mis Compras
              </Link>
            </li>

            {/* ADMIN PANEL (si es admin) */}
            {user.rol === 'admin' && (
              <li>
                <Link to="/admin" style={{
                  color: '#d97706',
                  fontWeight: 'bold',
                  textDecoration: 'none'
                }}>
                  ⚙️ Admin
                </Link>
              </li>
            )}

            {/* MI CUENTA */}
            <li>
              <Link to="/perfil" style={{
                color: '#333',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}>
                👤 {user.nombre || 'Mi Cuenta'}
              </Link>
            </li>

            {/* LOGOUT */}
            <li>
              <button onClick={handleLogout} style={{
                backgroundColor: '#ef4444',
                color: 'white',
                padding: '8px 15px',
                border: 'none',
                borderRadius: 4,
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Salir
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" style={{
              color: '#333',
              fontWeight: 'bold',
              backgroundColor: '#fbbf24',
              padding: '8px 15px',
              borderRadius: 4,
              textDecoration: 'none'
            }}>
              🔐 Iniciar Sesión
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
