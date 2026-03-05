import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductCard } from './ProductCard';

export function ProductList() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const respuesta = await axios.get('http://localhost:4000/api/products');
                console.log("Datos recibidos de la API:", respuesta.data);
                setProductos(respuesta.data.data || respuesta.data);
            } catch (err) {
                console.error("Error al obtener productos:", err);
                setError("No se pudo conectar al backend. Mostrando datos de prueba.");
                setProductos([
                    { id: 1, nombre: 'Laptop Gamer (Prueba)', precio: 15000, stock: 8, imagen_url: null },
                    { id: 2, nombre: 'Iphone 19 (Prueba)', precio: 100000, stock: 0, imagen_url: null },
                    { id: 3, nombre: 'Audífonos Sony (Prueba)', precio: 2500, stock: 15, imagen_url: null }
                ]);
            } finally {
                setCargando(false);
            }
        };

        obtenerProductos();
    }, []);

    const styles = {
        grid: { display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px' },
        mensaje: { textAlign: 'center', color: '#94a3b8', marginTop: '50px' },
        error: { textAlign: 'center', color: '#eab308', marginTop: '20px', padding: '10px', backgroundColor: '#332919', borderRadius: '5px' }
    };

    if (cargando) {
        return <h2 style={styles.mensaje}>Cargando catálogo desde la base de datos...</h2>;
    }

    return (
        <>
            {error && <p style={styles.error}>⚠️ {error}</p>}
            {(!productos || productos.length === 0) ? (
                <h2 style={styles.mensaje}>No hay productos en la tienda aún.</h2>
            ) : (
                <div style={styles.grid}>
                    {productos.map((prod) => (
                        <ProductCard key={prod.id} producto={prod} />
                    ))}
                </div>
            )}
        </>
    );
}