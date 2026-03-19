import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import Swal from 'sweetalert2';

export function ProductCard({ producto }) {
    const { addToCart } = useContext(CartContext);
    const [hover, setHover] = useState(false);
    const [agregado, setAgregado] = useState(false);

    const imageUrl = producto.imagen_url
        ? `http://localhost:4000/${producto.imagen_url.replace(/\\/g, '/')}`
        : null;

    const handleAgregar = () => {
        addToCart(producto);
        setAgregado(true);
        setTimeout(() => setAgregado(false), 2000);

        // ✅ Toast pequeño en vez de alert nativo
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: `✅ ${producto.nombre} agregado`,
            showConfirmButton: false,
            timer: 1800,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
    };

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                backgroundColor: '#fff', borderRadius: 12,
                overflow: 'hidden', display: 'flex', flexDirection: 'column',
                boxShadow: hover ? '0 12px 32px rgba(52,131,250,0.2)' : '0 2px 8px rgba(0,0,0,0.07)',
                transform: hover ? 'translateY(-6px)' : 'translateY(0)',
                transition: 'all 0.3s ease',
                border: hover ? '1px solid #3483fa' : '1px solid #f0f0f0',
            }}
        >
            {/* IMAGEN */}
            <div style={{ position: 'relative', height: 190, overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
                {imageUrl ? (
                    <img src={imageUrl} alt={producto.nombre} style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                        transform: hover ? 'scale(1.08)' : 'scale(1)'
                    }} />
                ) : (
                    <div style={{
                        width: '100%', height: '100%', display: 'flex',
                        flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', color: '#ccc', gap: 8
                    }}>
                        <span style={{ fontSize: '3rem' }}>📦</span>
                        <span style={{ fontSize: '0.8rem' }}>Sin imagen</span>
                    </div>
                )}
                <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {producto.stock === 0 && (
                        <span style={{ backgroundColor: '#ef4444', color: 'white', padding: '3px 10px', borderRadius: 20, fontSize: '0.7rem', fontWeight: '800' }}>AGOTADO</span>
                    )}
                    {producto.stock > 0 && producto.stock <= 5 && (
                        <span style={{ backgroundColor: '#f59e0b', color: 'white', padding: '3px 10px', borderRadius: 20, fontSize: '0.7rem', fontWeight: '800' }}>¡ÚLTIMAS!</span>
                    )}
                    {producto.stock > 10 && (
                        <span style={{ backgroundColor: '#10b981', color: 'white', padding: '3px 10px', borderRadius: 20, fontSize: '0.7rem', fontWeight: '800' }}>DISPONIBLE</span>
                    )}
                </div>
            </div>

            {/* CONTENIDO */}
            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.88rem', color: '#444', lineHeight: 1.4, minHeight: 38, fontWeight: '500' }}>
                    {producto.nombre}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                    <span style={{ color: '#3483fa', fontSize: '0.8rem' }}>★★★★★</span>
                    <span style={{ color: '#999', fontSize: '0.75rem' }}>(24)</span>
                </div>
                <p style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1a1a2e', margin: '0 0 2px 0' }}>
                    ${Number(producto.precio).toLocaleString()}
                </p>
                <p style={{ fontSize: '0.78rem', color: '#10b981', margin: '0 0 14px 0', fontWeight: '600' }}>
                    {producto.stock > 0 ? '✅ Envío gratis · Llega en 3 días' : '❌ Sin stock disponible'}
                </p>

                {producto.stock > 0 ? (
                    <button onClick={handleAgregar} style={{
                        width: '100%', padding: '11px',
                        backgroundColor: agregado ? '#10b981' : '#3483fa',
                        color: 'white', border: 'none', borderRadius: 8,
                        cursor: 'pointer', fontWeight: '700', fontSize: '0.88rem',
                        marginTop: 'auto', transition: 'all 0.3s'
                    }}>
                        {agregado ? '✅ ¡Agregado!' : '🛒 Agregar al carrito'}
                    </button>
                ) : (
                    <button disabled style={{
                        width: '100%', padding: '11px',
                        backgroundColor: '#f3f4f6', color: '#9ca3af',
                        border: '1px solid #e5e7eb', borderRadius: 8,
                        cursor: 'not-allowed', fontWeight: '700', marginTop: 'auto'
                    }}>
                        Sin stock
                    </button>
                )}
            </div>
        </div>
    );
}
