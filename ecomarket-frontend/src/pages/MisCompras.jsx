import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MisCompras() {
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const cargarOrdenes = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/orders/mis-compras', {
          // ✅ FIX 1: URL correcta /mis-compras
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrdenes(res.data || []); // ✅ FIX 2: res.data directo, no res.data.data
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
      <h2 style={{ color: '#333', borderBottom: '3px solid #FFE600', paddingBottom: 15 }}>
        📦 Mis Compras
      </h2>

      {cargando ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>⏳ Cargando tus órdenes...</p>
        </div>
      ) : ordenes.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: 40,
          backgroundColor: '#f9fafb',
          borderRadius: 8,
          border: '1px solid #e5e7eb'
        }}>
          <p style={{ fontSize: '2rem' }}>🛍️</p>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>No tienes compras aún.</p>
          <a href="/" style={{
            display: 'inline-block',
            marginTop: 10,
            padding: '10px 24px',
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
        ordenes.map(orden => (
          <div key={orden.id} style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            padding: 20,
            marginBottom: 15,
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
          }}>
            {/* CABECERA */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ margin: 0, color: '#333', fontSize: '1.1rem' }}>
                🧾 Orden #{orden.id}
              </h3>
              <span style={{
                backgroundColor: orden.estado === 'completado' ? '#10b981' : '#f59e0b',
                color: 'white',
                padding: '4px 14px',
                borderRadius: 20,
                fontSize: '0.82rem',
                fontWeight: 'bold',
                letterSpacing: '0.5px'
              }}>
                {orden.estado?.toUpperCase()}
              </span>
            </div>

            {/* DETALLES */}
            <div style={{ display: 'flex', gap: 30, marginBottom: 12 }}>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                📅 <strong>Fecha:</strong> {new Date(orden.createdAt).toLocaleDateString('es-MX', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
              <p style={{ margin: 0, color: '#333', fontSize: '0.9rem', fontWeight: 'bold' }}>
                💰 Total: ${Number(orden.total).toLocaleString()}
              </p>
            </div>

            {/* PRODUCTOS */}
            {orden.Products && orden.Products.length > 0 && (
              <details style={{ marginTop: 8 }}>
                <summary style={{
                  fontWeight: 'bold',
                  color: '#3483fa',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}>
                  Ver {orden.Products.length} producto(s)
                </summary>
                <ul style={{ marginTop: 10, paddingLeft: 20 }}>
                  {orden.Products.map((prod, i) => (
                    <li key={i} style={{ color: '#555', fontSize: '0.9rem', marginBottom: 4 }}>
                      {prod.nombre} — x{prod.OrderItem?.cantidad} — 
                      ${Number(prod.OrderItem?.precio_unitario).toLocaleString()}
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
