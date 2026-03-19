import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductCard } from './ProductCard';
import { useWindowSize } from '../hooks/useWindowSize';

export function ProductList() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const { isMobile, isTablet } = useWindowSize();

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const respuesta = await axios.get('http://localhost:4000/api/products');
                setProductos(respuesta.data.data || respuesta.data);
            } catch (_) {
                setError('No se pudo conectar al servidor.');
                setProductos([
                    { id: 1, nombre: 'Laptop Gamer (Demo)', precio: 15000, stock: 8, imagen_url: null },
                    { id: 2, nombre: 'iPhone 19 Pro (Demo)', precio: 25000, stock: 0, imagen_url: null },
                    { id: 3, nombre: 'Audífonos Sony (Demo)', precio: 2500, stock: 3, imagen_url: null },
                ]);
            } finally {
                setCargando(false);
            }
        };
        obtenerProductos();
    }, []);

    // ✅ Columnas responsivas
    const columnas = isMobile ? 1 : isTablet ? 2 : 4;

    if (cargando) return (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{
                display: 'inline-block', width: 48, height: 48,
                border: '5px solid #f0f0f0', borderTop: '5px solid #3483fa',
                borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                marginBottom: 16
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ color: '#888' }}>Cargando productos...</p>
        </div>
    );

    return (
        <>
            {error && (
                <div style={{
                    backgroundColor: '#fef3c7', border: '1px solid #fcd34d',
                    color: '#92400e', padding: '12px 16px', borderRadius: 8,
                    marginBottom: 20, fontSize: '0.9rem'
                }}>
                    ⚠️ {error} Mostrando productos de demo.
                </div>
            )}
            {productos.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 60 }}>
                    <p style={{ fontSize: '3rem' }}>🏪</p>
                    <p style={{ color: '#888' }}>No hay productos disponibles aún.</p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columnas}, 1fr)`,
                    gap: isMobile ? 16 : 24
                }}>
                    {productos.map(prod => (
                        <ProductCard key={prod.id} producto={prod} />
                    ))}
                </div>
            )}
        </>
    );
}
