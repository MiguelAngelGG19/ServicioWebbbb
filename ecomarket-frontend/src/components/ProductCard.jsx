import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export function ProductCard({ producto }) {
    const { addToCart } = useContext(CartContext);

    const imageUrl = producto.imagen_url
        ? `http://localhost:4000/${producto.imagen_url.replace(/\\/g, '/')}`
        : 'https://placehold.co/300x200?text=Sin+imagen';

    const handleAgregar = () => {
        addToCart(producto);
        alert(`✅ "${producto.nombre}" agregado al carrito`);
    };

    return (
        <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: '#fff',
            width: 260,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'box-shadow 0.2s'
        }}>
            <img
                src={imageUrl}
                alt={producto.nombre}
                style={{ width: '100%', height: 180, objectFit: 'cover' }}
            />
            <div style={{ padding: 15, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1rem', color: '#333' }}>
                    {producto.nombre}
                </h3>
                <p style={{
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    color: '#333',
                    margin: '0 0 8px 0'
                }}>
                    ${Number(producto.precio).toLocaleString()}
                </p>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: 15 }}>
                    {producto.stock > 0
                        ? `✅ Stock: ${producto.stock} disponibles`
                        : '❌ Sin stock'}
                </p>

                {producto.stock > 0 ? (
                    <button
                        onClick={handleAgregar}
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#FFE600',
                            color: '#333',
                            border: 'none',
                            borderRadius: 6,
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '0.95rem',
                            marginTop: 'auto'
                        }}
                    >
                        🛒 Agregar al carrito
                    </button>
                ) : (
                    <button disabled style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#e5e7eb',
                        color: '#9ca3af',
                        border: 'none',
                        borderRadius: 6,
                        cursor: 'not-allowed',
                        fontWeight: 'bold',
                        marginTop: 'auto'
                    }}>
                        Agotado
                    </button>
                )}
            </div>
        </div>
    );
}
