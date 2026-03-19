import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

function Cart() {
  const { cart, clearCart } = useContext(CartContext);
  const [procesando, setProcesando] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const totalCarrito = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    setProcesando(true);
    try {
      const payload = {
        items: cart.map(item => ({ productId: item.id, cantidad: item.cantidad }))
      };
      const respuesta = await axios.post('http://localhost:4000/api/orders', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (respuesta.data.success) {
        alert(`✅ ¡Compra exitosa! Tu número de orden es: #${respuesta.data.orderId}`);
        clearCart();
        navigate('/mis-compras');
      }
    } catch (error) {
      console.error(error);
      alert('❌ Error procesando la compra: ' + (error.response?.data?.error || 'Error de servidor'));
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '30px auto', padding: 20 }}>
      <h2 style={{ color: '#1a1a2e', borderBottom: '3px solid #3483fa', paddingBottom: 15 }}>
        🛒 Mi Carrito de Compras
      </h2>

      {cart.length === 0 ? (
        <div style={{
          backgroundColor: '#f0f4ff', padding: 40,
          borderRadius: 12, textAlign: 'center',
          border: '1px solid #dbeafe'
        }}>
          <p style={{ fontSize: '3rem', margin: '0 0 10px' }}>🛒</p>
          <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: 20 }}>
            Tu carrito está vacío
          </p>
          <Link to="/" style={{
            display: 'inline-block',
            padding: '12px 28px',
            backgroundColor: '#3483fa',
            color: 'white',
            textDecoration: 'none',
            borderRadius: 8,
            fontWeight: 'bold',
            fontSize: '1rem'
          }}>
            🛍️ Ir al catálogo
          </Link>
        </div>
      ) : (
        <>
          {/* LISTA DE PRODUCTOS */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            {cart.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: index === cart.length - 1 ? 'none' : '1px solid #f3f4f6',
                transition: 'background 0.2s'
              }}>
                {/* ÍCONO + INFO */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 8,
                    backgroundColor: '#eff6ff',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '1.5rem',
                    flexShrink: 0
                  }}>
                    📦
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', color: '#1a1a2e', fontSize: '0.95rem' }}>
                      {item.nombre}
                    </h4>
                    <p style={{ margin: 0, color: '#888', fontSize: '0.85rem' }}>
                      ${Number(item.precio).toLocaleString()} × {item.cantidad} unidad(es)
                    </p>
                  </div>
                </div>

                {/* PRECIO */}
                <div style={{
                  fontWeight: '800', fontSize: '1.1rem',
                  color: '#3483fa', minWidth: 120, textAlign: 'right'
                }}>
                  ${(item.precio * item.cantidad).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* RESUMEN */}
          <div style={{
            backgroundColor: '#fff', padding: 24,
            marginTop: 20, borderRadius: 12,
            border: '2px solid #3483fa',
            boxShadow: '0 4px 16px rgba(52,131,250,0.1)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#1a1a2e', fontSize: '1.1rem' }}>
              📋 Resumen del pedido
            </h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ color: '#555' }}>Subtotal ({cart.length} producto{cart.length > 1 ? 's' : ''}):</span>
              <span style={{ color: '#333', fontWeight: '600' }}>${totalCarrito.toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ color: '#555' }}>Envío:</span>
              <span style={{ color: '#10b981', fontWeight: '600' }}>✅ Gratis</span>
            </div>

            <div style={{
              display: 'flex', justifyContent: 'space-between',
              paddingTop: 16, borderTop: '2px solid #e5e7eb',
              marginBottom: 24
            }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1a1a2e' }}>Total:</span>
              <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#3483fa' }}>
                ${totalCarrito.toLocaleString()}
              </span>
            </div>

            {/* BOTONES */}
            <div style={{ display: 'flex', gap: 12 }}>
              <Link to="/" style={{
                flex: 1, padding: '13px',
                backgroundColor: '#f3f4f6',
                color: '#555',
                textDecoration: 'none',
                borderRadius: 8,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '0.95rem',
                border: '1px solid #e5e7eb'
              }}>
                ← Seguir comprando
              </Link>
              <button
                onClick={handleCheckout}
                disabled={procesando}
                style={{
                  flex: 1, padding: '13px',
                  backgroundColor: procesando ? '#93c5fd' : '#3483fa',
                  color: 'white',
                  border: 'none', borderRadius: 8,
                  fontWeight: 'bold', fontSize: '1rem',
                  cursor: procesando ? 'not-allowed' : 'pointer',
                  boxShadow: procesando ? 'none' : '0 4px 12px rgba(52,131,250,0.4)',
                  transition: 'all 0.2s'
                }}
              >
                {procesando ? '⏳ Procesando...' : '💳 Pagar Ahora'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
