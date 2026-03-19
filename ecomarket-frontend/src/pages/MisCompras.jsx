import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MisCompras() {
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const cargarOrdenes = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/orders/mis-compras', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrdenes(res.data || []);
      } catch (e) {
        console.error('Error cargando órdenes:', e);
      } finally {
        setCargando(false);
      }
    };
    cargarOrdenes();
  }, [token]);

  return (
    <div style={{ maxWidth: 900, margin: '30px auto', padding: 20 }}>
      <h2 style={{ color: '#1a1a2e', borderBottom: '3px solid #3483fa', paddingBottom: 15 }}>
        📦 Mis Compras
      </h2>

      {cargando ? (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <div style={{
            display: 'inline-block', width: 42, height: 42,
            border: '5px solid #e5e7eb',
            borderTop: '5px solid #3483fa',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            marginBottom: 14
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: '#888' }}>Cargando tus órdenes...</p>
        </div>
      ) : ordenes.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: 50,
          backgroundColor: '#f0f4ff',
          borderRadius: 12, border: '1px solid #dbeafe'
        }}>
          <p style={{ fontSize: '3rem', margin: '0 0 10px' }}>🛍️</p>
          <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: 20 }}>
            No tienes compras aún
          </p>
          <Link to="/" style={{
            display: 'inline-block',
            padding: '12px 28px',
            backgroundColor: '#3483fa',
            color: 'white',
            textDecoration: 'none',
            borderRadius: 8,
            fontWeight: 'bold'
          }}>
            🛒 Ir al catálogo
          </Link>
        </div>
      ) : (
        ordenes.map(orden => (
          <div key={orden.id} style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: 22,
            marginBottom: 16,
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
            transition: 'box-shadow 0.2s'
          }}>
            {/* CABECERA */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: 14
            }}>
              <h3 style={{ margin: 0, color: '#1a1a2e', fontSize: '1.05rem' }}>
                🧾 Orden #{orden.id}
              </h3>
              <span style={{
                backgroundColor: orden.estado === 'completado' ? '#d1fae5' : '#fef3c7',
                color: orden.estado === 'completado' ? '#065f46' : '#92400e',
                padding: '5px 16px',
                borderRadius: 20,
                fontSize: '0.8rem',
                fontWeight: '800',
                letterSpacing: '0.5px',
                border: orden.estado === 'completado' ? '1px solid #6ee7b7' : '1px solid #fcd34d'
              }}>
                {orden.estado === 'completado' ? '✅ COMPLETADO' : '⏳ ' + orden.estado?.toUpperCase()}
              </span>
            </div>

            {/* DETALLES */}
            <div style={{
              display: 'flex', gap: 24, marginBottom: 14,
              padding: '12px 16px',
              backgroundColor: '#f8faff',
              borderRadius: 8
            }}>
              <p style={{ margin: 0, color: '#555', fontSize: '0.9rem' }}>
                📅 <strong>Fecha:</strong> {new Date(orden.createdAt).toLocaleDateString('es-MX', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
              <p style={{ margin: 0, color: '#1a1a2e', fontSize: '0.9rem', fontWeight: '800' }}>
                💰 Total: <span style={{ color: '#3483fa' }}>${Number(orden.total).toLocaleString()}</span>
              </p>
            </div>

            {/* PRODUCTOS */}
            {orden.Products && orden.Products.length > 0 && (
              <details>
                <summary style={{
                  fontWeight: 'bold', color: '#3483fa',
                  cursor: 'pointer', fontSize: '0.9rem',
                  userSelect: 'none'
                }}>
                  📋 Ver {orden.Products.length} producto(s)
                </summary>
                <ul style={{ marginTop: 10, paddingLeft: 20 }}>
                  {orden.Products.map((prod, i) => (
                    <li key={i} style={{
                      color: '#555', fontSize: '0.9rem',
                      marginBottom: 6, lineHeight: 1.5
                    }}>
                      <strong>{prod.nombre}</strong> — x{prod.OrderItem?.cantidad} —{' '}
                      <span style={{ color: '#3483fa', fontWeight: '700' }}>
                        ${Number(prod.OrderItem?.precio_unitario).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        ))
      )}
    </div>
  );
}
