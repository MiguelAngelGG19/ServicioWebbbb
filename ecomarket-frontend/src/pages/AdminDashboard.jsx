import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    stock: '',
    descripcion: '',
    CategoryId: 1
  });
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [productos, setProductos] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/products');
      setProductos(res.data.data || []);
    } catch (e) {
      console.error('Error cargando productos:', e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');

    try {
      const formData = new FormData();
      formData.append('nombre', form.nombre);
      formData.append('precio', form.precio);
      formData.append('stock', form.stock);
      formData.append('descripcion', form.descripcion);
      formData.append('CategoryId', form.CategoryId);
      
      if (imagen) {
        formData.append('imagen', imagen);
      }

      const res = await axios.post('http://localhost:4000/api/products', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        setMensaje(`✅ Producto "${res.data.nombre}" subido correctamente`);
setForm({ nombre: '', precio: '', stock: '', descripcion: '', CategoryId: 1 });
setImagen(null);
cargarProductos();
      }
    } catch (error) {
      setMensaje('❌ Error: ' + (error.response?.data?.error || 'Error de servidor'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: '30px auto', padding: 20 }}>
      <h2 style={{ color: '#333', borderBottom: '3px solid #FFE600', paddingBottom: 15 }}>
        ⚙️ Panel de Administrador
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginBottom: 40 }}>
        {/* FORMULARIO */}
        <div style={{
          backgroundColor: '#fff',
          padding: 25,
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Nuevo Producto</h3>

          {mensaje && (
            <div style={{
              padding: 12,
              marginBottom: 15,
              borderRadius: 6,
              backgroundColor: mensaje.includes('✅') ? '#d1fae5' : '#fee2e2',
              color: mensaje.includes('✅') ? '#065f46' : '#991b1b',
              fontWeight: 'bold'
            }}>
              {mensaje}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* NOMBRE */}
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold', color: '#333' }}>
                Nombre del Producto *
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ddd',
                  borderRadius: 6,
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
                placeholder="Ej. Laptop Gamer"
              />
            </div>

            {/* PRECIO */}
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold', color: '#333' }}>
                Precio ($) *
              </label>
              <input
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ddd',
                  borderRadius: 6,
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
                placeholder="25000"
              />
            </div>

            {/* STOCK */}
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold', color: '#333' }}>
                Stock (Cantidad) *
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleInputChange}
                required
                min="0"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ddd',
                  borderRadius: 6,
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
                placeholder="10"
              />
            </div>

            {/* DESCRIPCIÓN */}
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold', color: '#333' }}>
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleInputChange}
                rows="3"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ddd',
                  borderRadius: 6,
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  fontFamily: 'Arial'
                }}
                placeholder="Descripción del producto..."
              />
            </div>

            {/* IMAGEN */}
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold', color: '#333' }}>
                Imagen del Producto *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px dashed #FFE600',
                  borderRadius: 6,
                  boxSizing: 'border-box'
                }}
              />
              {imagen && <p style={{ fontSize: '0.9rem', color: '#666', marginTop: 5 }}>✅ {imagen.name}</p>}
            </div>

            {/* BOTÓN */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: loading ? '#cccccc' : '#FFE600',
                color: '#333',
                border: 'none',
                borderRadius: 6,
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '⏳ Subiendo...' : '📤 Subir Producto'}
            </button>
          </form>
        </div>

        {/* LISTA DE PRODUCTOS */}
        <div style={{
          backgroundColor: '#fff',
          padding: 25,
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxHeight: 600,
          overflowY: 'auto'
        }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Productos en Catálogo</h3>
          {productos.length === 0 ? (
            <p style={{ color: '#666' }}>No hay productos aún</p>
          ) : (
            productos.map(prod => (
              <div key={prod.id} style={{
                padding: 12,
                borderBottom: '1px solid #eee',
                fontSize: '0.9rem'
              }}>
                <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#333' }}>
                  {prod.nombre}
                </p>
                <p style={{ margin: '0 0 3px 0', color: '#666' }}>
                  💰 ${prod.precio.toLocaleString()}
                </p>
                <p style={{ margin: '0 0 3px 0', color: '#666' }}>
                  📦 Stock: {prod.stock}
                </p>
                <p style={{ margin: 0, color: '#999' }}>
                  ID: {prod.id}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
