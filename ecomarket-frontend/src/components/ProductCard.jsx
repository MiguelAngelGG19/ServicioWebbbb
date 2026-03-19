import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

export function ProductCard({ producto }) {
    const { addToCart } = useContext(CartContext);
    const [hover, setHover] = useState(false);
    const [agregado, setAgregado] = useState(false);

    const imageUrl = producto.imagen_url
        ? `http://localhost:4000/${producto.imagen_url.replace(/\\/g, '/')}`
        : 'https://placehold.co/300x200?text=Sin+imagen';

    const handleAgregar = () => {
        addToCart(producto);
        setAgregado(true);
        setTimeout(() => setAgregado(false), 2000);
    };

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                border: '1px solid #e8e8e8',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#fff',
                width: 240,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: hover ? '0 6px 20px rgba(0,0,0,0.15)' : '0 2px 6px rgba(0,0,0,0.07)',
                transition: 'all 0.25s ease',
                transform: hover ? 'translateY(-4px)' : 'translateY(0)',
                cursor: 'pointer'
            }}
        >
            <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                    src={imageUrl}
                    alt={producto.nombre}
                    style={{
                        width: '100%',
                        height: 180,
                        objectFit: 'cover',
                        transition: 'transform 0.3s',
                        transform: hover ? 'scale(1.05)' : 'scale(1)'
                    }}
                />
                {producto.stock === 0 && (
                    <div style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        backgroundColor: '#ef4444',
                        color: 'white',
                        padding: '3px 10px',
                        borderRadius: 20,
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                    }}>
                        AGOTADO
                    </div>
                )}
                {producto.stock > 0 && producto.stock <= 5 && (
                    <div style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        padding: '3px 10px',
                        borderRadius: 20,
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                    }}>
                        ¡ÚLTIMAS UNIDADES!
                    </div>
                )}
            </div>

            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <p style={{
                    margin: '0 0 6px 0',
                    fontSize: '0.9rem',
                    color: '#555',
                    lineHeight: 1.4,
                    minHeight: 40
                }}>
                    {producto.nombre}
                </p>
                <p style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#333',
                    margin: '0 0 4px 0'
                }}>
                    ${Number(producto.precio).toLocaleString()}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#00a650', marginBottom: 14, fontWeight: 'bold' }}>
                    {producto.stock > 0 ? `Envío gratis` : ''}
                </p>

                {producto.stock > 0 ? (
                    <button
                        onClick={handleAgregar}
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: agregado ? '#00a650' : '#3483fa',
                            color: 'white',
                            border: 'none',
                            borderRadius: 6,
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            marginTop: 'auto',
                            transition: 'background-color 0.3s'
                        }}
                    >
                        {agregado ? '✅ ¡Agregado!' : 'Agregar al carrito'}
                    </button>
                ) : (
                    <button disabled style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#f3f4f6',
                        color: '#9ca3af',
                        border: '1px solid #e5e7eb',
                        borderRadius: 6,
                        cursor: 'not-allowed',
                        fontWeight: 'bold',
                        marginTop: 'auto'
                    }}>
                        Sin stock
                    </button>
                )}
            </div>
        </div>
    );
}
