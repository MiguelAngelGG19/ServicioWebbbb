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
        items: cart.map(item => ({
          productId: item.id,
          cantidad: item.cantidad
        }))
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
      <h2 style={{ color: '#333', borderBottom: '3px solid #FFE600', paddingBottom: 15 }}>
        🛒 Mi Carrito de Compras
      </h2>

      {cart.length === 0 ? (
        <div style={{ backgroundColor: '#f3f4f6', padding: 30, borderRadius: 8, textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>Tu carrito está vacío 😢</p>
          <a href="/" style={{
            display: 'inline-block',
            marginTop: 15,
            padding: '10px 25px',
            backgroundColor: '#FFE600',
            color: '#333',
            textDecoration: 'none',
            borderRadius: 6,
            fontWeight: 'bold'
          }}>
            Ir al catálogo
          </a>
        </div>
      ) : (
        <>
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: 8,
            overflow: 'hidden'
          }}>
            {/* TABLA DE PRODUCTOS */}
            {cart.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 15,
                borderBottom: index === cart.length - 1 ? 'none' : '1px solid #eee'
              }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{item.nombre}</h4>
                  <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                    ${item.precio.toLocaleString()} x {item.cantidad}
                  </p>
                </div>
                <div style={{
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  color: '#FFE600',
                  minWidth: 120,
                  textAlign: 'right'
                }}>
                  ${(item.precio * item.cantidad).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* RESUMEN */}
          <div style={{
            backgroundColor: '#f9fafb',
            padding: 20,
            marginTop: 20,
            borderRadius: 8,
            border: '2px solid #FFE600'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>
                Subtotal:
              </span>
              <span style={{ fontSize: '1.1rem', color: '#666' }}>
                ${totalCarrito.toLocaleString()}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>
                Envío:
              </span>
              <span style={{ fontSize: '1.1rem', color: '#666' }}>
                Gratis
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 15,
              borderTop: '2px solid #ddd'
            }}>
              <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#333' }}>
                Total:
              </span>
              <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#FFE600' }}>
                ${totalCarrito.toLocaleString()}
              </span>
            </div>

            {/* BOTONES */}
            <div style={{ display: 'flex', gap: 15, marginTop: 20 }}>
              <Link to="/" style={{
    flex: 1,
    padding: '12px',
    backgroundColor: '#e5e7eb',
    color: '#333',
    textDecoration: 'none',
    borderRadius: 6,
    fontWeight: 'bold',
    textAlign: 'center'
}}>
    ← Seguir comprando
</Link>
              <button
                onClick={handleCheckout}
                disabled={procesando}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: procesando ? '#cccccc' : '#FFE600',
                  color: '#333',
                  border: 'none',
                  borderRadius: 6,
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  cursor: procesando ? 'not-allowed' : 'pointer'
                }}
              >
                {procesando ? '⏳ Procesando pago...' : '💳 Pagar Ahora'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
