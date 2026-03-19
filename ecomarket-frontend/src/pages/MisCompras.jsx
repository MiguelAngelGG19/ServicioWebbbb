import { useEffect, useState } from 'react';
import axios from 'axios';

function MisCompras() {
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const cargarOrdenes = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrdenes(res.data.data || []);
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
        <p>Cargando ordenes...</p>
      ) : ordenes.length === 0 ? (
        <p>No tienes compras aún.</p>
      ) : (
        ordenes.map(orden => (
          <div key={orden.id} style={{
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: 8,
            padding: 20,
            marginBottom: 15,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <h3 style={{ margin: 0, color: '#333' }}>Orden #{orden.id}</h3>
              <span style={{
                backgroundColor: orden.estado === 'completado' ? '#10b981' : '#f59e0b',
                color: 'white',
                padding: '5px 15px',
                borderRadius: 20,
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                {orden.estado.toUpperCase()}
              </span>
            </div>
            <p style={{ margin: '5px 0', color: '#666' }}>
              <strong>Fecha:</strong> {new Date(orden.createdAt).toLocaleDateString()}
            </p>
            <p style={{ margin: '5px 0', color: '#666' }}>
              <strong>Total:</strong> ${orden.total.toLocaleString()}
            </p>
            {orden.OrderItems && orden.OrderItems.length > 0 && (
              <details style={{ marginTop: 10, cursor: 'pointer' }}>
                <summary style={{ fontWeight: 'bold', color: '#3b82f6' }}>Ver productos</summary>
                <ul style={{ marginTop: 10, paddingLeft: 20 }}>
                  {orden.OrderItems.map((item, i) => (
                    <li key={i}>
                      {item.Product?.nombre} x{item.cantidad} — ${item.precio_unitario}
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

export default MisCompras;
